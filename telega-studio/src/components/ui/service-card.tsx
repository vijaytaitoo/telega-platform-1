import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "./button"

export interface ServiceCardProps {
  title: string
  priceRange: string
  portfolioUrls: string[]
  onBook?: () => void
}

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ title, priceRange, portfolioUrls, onBook }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="bg-white/80 dark:bg-white/5 rounded-2xl shadow-md hover:shadow-xl transition p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-3 gap-2 mb-4">
          {portfolioUrls.slice(0, 3).map((url, index) => (
            <div key={url} className="relative aspect-square">
              <Image
                src={url}
                alt={`${title} portfolio ${index + 1}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{priceRange}</p>
        <Button
          onClick={onBook}
          variant="gradient"
          className="w-full"
        >
          Записаться
        </Button>
      </motion.div>
    )
  }
)

ServiceCard.displayName = "ServiceCard"