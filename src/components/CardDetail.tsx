import { Product } from '../types/product.type'
import StarRating from './StarRating'

type Props = {
  product: Product
  actions: () => JSX.Element
}
function CardDetail({ product, actions }: Props) {
  return (
    <>
      <div className="text-md">{product?.title}</div>
      <div className="text-2xl font-bold">${product?.price}</div>
      <div className="flex items-center">
        <div className="overflow-hidden rounded-sm bg-red-300 p-1 text-sm text-red-900">
          {Math.ceil(product.discountPercentage)}%
        </div>
        <div className="ml-1   text-sm line-through">
          ${Math.trunc((product.discountPercentage / 100 + 1) * product.price)}
        </div>
      </div>
      <div className="text-md">{product.brand}</div>
      <p>{product.category}</p>
      <p>Stock:{product.stock}</p>
      <StarRating rating={product.rating} />
      <div className="mt-10">{actions()}</div>
    </>
  )
}
export default CardDetail
