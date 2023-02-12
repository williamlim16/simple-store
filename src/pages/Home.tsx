import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import BeatLoader from 'react-spinners/BeatLoader'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../product/components/ProductCard'
import { getProducts } from '../product/product.service'
import { ProductApi } from '../types/api.type'
import { Product } from '../types/product.type'

export function Home() {
  const navigate = useNavigate()
  const {
    isLoading,
    isError,
    error,
    data: products,
  } = useQuery<ProductApi, Error>('products', getProducts)

  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  function updateQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: error?.message,
      })
    }
  }, [isError, error])

  useEffect(() => {
    if (!isLoading && products) {
      setFilteredProducts([
        ...products.products.filter((element) => {
          return element.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        }),
      ])
    }
  }, [products, query, isLoading])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  function redirect(id: number) {
    navigate(`/${id}`)
  }

  return (
    <div>
      <div className="mx-10 mt-10 flex flex-wrap items-center justify-evenly gap-x-1">
        <h1 className="text-md  text-left">GadgetIn Store</h1>
        <input
          type="search"
          id="default-search"
          className="max-h-16 w-10/12 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-5 text-sm"
          placeholder="Search Product"
          required
          onChange={(event) => updateQuery(event)}
        />
      </div>
      {isLoading ? (
        <div className="mt-24 flex justify-center">
          <BeatLoader color="#36d7b7" />
        </div>
      ) : (
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((element) => (
            <ProductCard
              product={element}
              key={element.id}
              onClick={() => {
                return redirect(element.id)
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
export default Home
