import Button from '../components/Button'
import CardDetail from '../components/CardDetail'
import { Product } from '../types/product.type'
import useCart from '../cart/cart.service'
// import { addProduct, removeProduct } from '../cart/cart.slice'

function Cart() {
  const { cart, removeProductFromCart } = useCart()
  function actions(product: Product) {
    return (
      <Button
        onClick={() => {
          removeProductFromCart(product.id)
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
