import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import paypal from 'paypal-rest-sdk';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Configure PayPal
paypal.configure({
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_CLIENT_SECRET!,
  mode: process.env.PAYPAL_ENV || 'sandbox',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userId = req.body.userId; // You'll need to pass this from your auth system
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { amount, currency = 'USD' } = req.body;

    const payment = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      transactions: [
        {
          amount: { total: amount.toString(), currency },
          description: 'Teleton Top-Up',
        },
      ],
      redirect_urls: {
        return_url: 'https://telega.app/wallet?success=true',
        cancel_url: 'https://telega.app/wallet?cancel=true',
      },
    };

    const response = await new Promise((resolve, reject) => {
      paypal.payment.create(payment, (error, payment) => {
        if (error) reject(error);
        else resolve(payment);
      });
    });

    // Get existing transactions or create empty array
    const { data: existingData } = await supabase
      .from('teleton')
      .select('transactions')
      .eq('user_id', userId)
      .single();

    const existingTransactions = existingData?.transactions || [];
    const newTransaction = {
      type: 'top-up',
      amount: amount,
      date: new Date().toISOString(),
      status: 'pending',
      payment_id: (response as any).id,
    };

    await supabase.from('teleton').upsert({
      user_id: userId,
      transactions: [...existingTransactions, newTransaction],
    });

    const approvalUrl = (response as any).links.find(
      (link: any) => link.rel === 'approval_url',
    )?.href;

    return res.status(200).json({
      paymentId: (response as any).id,
      approvalUrl,
    });
  } catch (error) {
    console.error('PayPal payment creation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
