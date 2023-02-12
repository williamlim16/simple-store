import { QueryFunctionContext, QueryKey } from 'react-query'
import { endPoint } from '../config/api'

const path = 'products'
export async function getProducts() {
  const res = await fetch(`${endPoint}/${path}`)
  if (!res.ok) {
    throw new Error('Server error!')
  }
  return res.json()
}

export async function getProduct({
  queryKey,
}: QueryFunctionContext<QueryKey, number>) {
  const [, prodId] = queryKey
  const res = await fetch(`${endPoint}/${path}/${prodId}`)
  if (!res.ok) {
    throw new Error('Server error!')
  }
  return res.json()
}
