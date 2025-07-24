import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "./button"

export interface ProductCardProps {
  title: string
  price: string
  imageUrl: string
  onBuy?: () => void
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ title, price, imageUrl, onBuy }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="bg-white/80 dark:bg-white/5 rounded-2xl shadow-md hover:shadow-xl transition p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full aspect-square mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{price}</p>
        <Button
          onClick={onBuy}
          variant="gradient"
          className="w-full"
        >
          Купить
        </Button>
      </motion.div>
    )
  }
)

ProductCard.displayName = "ProductCard"