/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart } from '../types/cart.type'
import { Product } from '../types/product.type'

const initialState: Cart = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products = [
        ...state.products,
        {
          ...action.payload,
        },
      ]
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (element) => element.id !== action.payload
      )
    },
  },
})

export const { addProduct, removeProduct } = cartSlice.actions
