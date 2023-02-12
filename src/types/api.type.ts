import { Product } from './product.type'

export type ProductApi = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
