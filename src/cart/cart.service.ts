import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct as addProductSlice,
  removeProduct as removeProductSlice,
} from './cart.slice'
import { Product } from '../types/product.type'
import { getCart } from '../store'

function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector(getCart)

  function addProductToCart(product: Product) {
    dispatch(addProductSlice(product))
  }

  function removeProductFromCart(id: number) {
    dispatch(removeProductSlice(id))
  }

  return {
    cart,
    addProductToCart,
    removeProductFromCart,
  }
}
export default useCart
