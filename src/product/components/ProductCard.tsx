import { motion } from 'framer-motion'
import StarRating from '../../components/StarRating'
import { Product } from '../../types/product.type'

type Props = {
  product: Product
  onClick: () => void
}

function ProductCard({ product, onClick }: Props) {
  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  }
  return (
    <motion.div variants={item}>
      <motion.div
        className=" w-56 cursor-pointer overflow-hidden rounded-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
      >
        <div
          className="h-52 w-56 bg-cover"
          style={{
            backgroundImage: `url(${product.images[0]})`,
          }}
        />
        <div className="p-3">
          <div className="text-md">{product.title}</div>
          <div className="text-2xl font-bold">${product.price}</div>
          <div className="flex items-center">
            <div className="overflow-hidden rounded-sm bg-red-300 p-1 text-sm text-red-900">
              {Math.ceil(product.discountPercentage)}%
            </div>
            <div className="ml-1   text-sm line-through">
              $
              {Math.trunc(
                (product.discountPercentage / 100 + 1) * product.price
              )}
            </div>
          </div>
          <div className="text-md">{product.brand}</div>
          <StarRating rating={product.rating} />
        </div>
      </motion.div>
    </motion.div>
  )
}
export default ProductCard
