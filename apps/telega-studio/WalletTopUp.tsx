import { useState } from 'react';
import { motion } from 'framer-motion';
export default function WalletTopUp() {
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const locale = 'en'; // Default to English

  const handleTopUp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ amount, currency: 'usd' }),
      });
      if (!res.ok) throw new Error('Payment initiation failed');
      const { sessionId } = await res.json();

      const stripe = await (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Top-up error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-white/5 rounded-2xl p-4 shadow-md"
    >
      <h3 className="text-lg font-semibold text-darkText dark:text-lightText mb-2">
        Top Up Wallet
      </h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-darkText dark:text-lightText mb-4"
        placeholder="Enter amount"
      />
      <button
        onClick={handleTopUp}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-accent1 to-accent2 rounded-xl text-white p-3 font-medium"
      >
        {isLoading ? 'Loading...' : 'Pay Now'}
      </button>
    </motion.div>
  );
}
