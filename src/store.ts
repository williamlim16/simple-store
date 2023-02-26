import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './cart/cart.slice'

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>

export function getCart(state: RootState) {
  return state.cart
}
