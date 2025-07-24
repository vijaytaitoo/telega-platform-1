import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userId = req.body.userId; // You'll need to pass this from your auth system
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const referralCode = Math.random().toString(36).substring(2, 10);
    const referralLink = `https://t.me/TeleGaApp?start=${referralCode}`;

    const { data, error } = await supabase
      .from('affiliates')
      .upsert({ 
        user_id: userId, 
        referral_code: referralCode, 
        referral_link: referralLink 
      });

    if (error) throw new Error(error.message);
    
    return res.status(200).json({ referralLink });
  } catch (error) {
    console.error('Affiliate link generation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 