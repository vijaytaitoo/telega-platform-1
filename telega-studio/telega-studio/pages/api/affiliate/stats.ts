import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userId = req.query.userId as string; // You'll need to pass this from your auth system
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { data } = await supabase
      .from('affiliates')
      .select('referral_link, referrals, teleton_earned')
      .eq('user_id', userId)
      .single();

    return res.status(200).json(data || { 
      referralLink: "", 
      referrals: 0, 
      teleton_earned: 0 
    });
  } catch (error) {
    console.error('Affiliate stats error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 