import { useSelector, useDispatch } from 'react-redux'
import Button from '../components/Button'
import CardDetail from '../components/CardDetail'
import { getCart } from '../store'
import { Product } from '../types/product.type'
import { removeProduct } from '../cart/cart.slice'
// import { addProduct, removeProduct } from '../cart/cart.slice'

function Cart() {
  const cart = useSelector(getCart)
  //   const dispatch = useDispatch()
  const dispatch = useDispatch()
  function actions(product: Product) {
    return (
      <Button
        onClick={() => {
          dispatch(removeProduct(product.id))
        }}
      >
        Delete
      </Button>
    )
  }

  return (
    <div>
      Cart
      {cart.products.map((product) => (
        <div key={product.id}>
          <CardDetail product={product} actions={() => actions(product)} />
        </div>
      ))}
    </div>
  )
}
export default Cart
