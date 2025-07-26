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

    const { paymentId, payerId } = req.body;

    const executePayment = { payer_id: payerId };

    const response = await new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, executePayment, (error, payment) => {
        if (error) reject(error);
        else resolve(payment);
      });
    });

    if ((response as any).state === 'approved') {
      const amount = parseFloat((response as any).transactions[0].amount.total);

      const { data: transaction } = await supabase
        .from('teleton')
        .select('balance, transactions')
        .eq('user_id', userId)
        .single();

      if (transaction) {
        const updatedTransactions = transaction.transactions.map((t: any) =>
          t.payment_id === paymentId ? { ...t, status: 'completed' } : t,
        );

        await supabase
          .from('teleton')
          .update({
            balance: (transaction.balance || 0) + amount,
            transactions: updatedTransactions,
          })
          .eq('user_id', userId);
      }
    }

    return res.status(200).json({ status: (response as any).state });
  } catch (error) {
    console.error('PayPal payment execution error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
