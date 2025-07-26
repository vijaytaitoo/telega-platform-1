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
    const event = req.body;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.user_id;

      if (userId) {
        const { data: transaction } = await supabase
          .from('teleton')
          .select('balance, transactions')
          .eq('user_id', userId)
          .single();

        if (transaction) {
          const updatedTransactions = transaction.transactions.map((t: any) =>
            t.session_id === session.id ? { ...t, status: 'completed' } : t,
          );

          await supabase
            .from('teleton')
            .update({
              balance: (transaction.balance || 0) + session.amount_total / 100,
              transactions: updatedTransactions,
            })
            .eq('user_id', userId);
        }
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
