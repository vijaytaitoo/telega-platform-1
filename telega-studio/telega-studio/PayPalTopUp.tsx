import { useState } from "react";
import { motion } from "framer-motion";
export default function PayPalTopUp() {
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const locale = "en"; // Default to English

  const handlePayPalTopUp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/paypal/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ amount, currency: "USD" }),
      });
      if (!res.ok) throw new Error("Payment initiation failed");
      const { approvalUrl } = await res.json();
      window.location.href = approvalUrl;
    } catch (error) {
      console.error("PayPal top-up error:", error);
      alert("Payment failed. Please try again.");
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
        Top Up with PayPal
      </h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-darkText dark:text-lightText mb-4"
        placeholder="Enter amount"
      />
      <button
        onClick={handlePayPalTopUp}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-accent1 to-accent2 rounded-xl text-white p-3 font-medium"
      >
        {isLoading ? "Loading..." : "Pay with PayPal"}
      </button>
    </motion.div>
  );
} 