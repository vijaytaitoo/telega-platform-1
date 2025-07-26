import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
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

    const { amount, currency = 'usd' } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: { name: 'Teleton Top-Up' },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://telega.app/wallet?success=true',
      cancel_url: 'https://telega.app/wallet?cancel=true',
      metadata: {
        user_id: userId,
      },
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
      session_id: session.id,
    };

    await supabase.from('teleton').upsert({
      user_id: userId,
      transactions: [...existingTransactions, newTransaction],
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
