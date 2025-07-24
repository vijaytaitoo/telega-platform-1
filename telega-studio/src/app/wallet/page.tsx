import { createClient } from "@/lib/supabase-client"
import { TelegramLoginButton } from "@/components/telegram-login-button"
import { ModeToggle } from "@/components/mode-toggle"
import { motion } from "framer-motion"

interface Transaction {
  type: string
  amount: number
  date: string
}

interface TeletonData {
  balance: number
  transactions: Transaction[]
}

export default async function WalletPage() {
  const supabase = createClient()
  const { data: user } = await supabase.auth.getUser()
  const { data: teleton } = await supabase
    .from("teleton")
    .select("balance, transactions")
    .eq("user_id", user?.user?.id)
    .single()

  if (!user?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TelegramLoginButton className="w-64" />
        </motion.div>
      </div>
    )
  }

  const teletonData = teleton as TeletonData

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-light dark:bg-dark"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold gradient-text"
        >
          Кошелёк
        </motion.h1>
        <ModeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 className="text-xl font-semibold gradient-text mb-2">
          Баланс: {teletonData?.balance || 0} Teleton
        </h2>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            История транзакций
          </h3>
          <ul className="space-y-3">
            {teletonData?.transactions?.map((tx: Transaction, index: number) => (
              <motion.li
                key={`${tx.date}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center p-3 bg-white/50 dark:bg-white/10 rounded-xl"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {tx.type}
                </span>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount} Teleton
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}