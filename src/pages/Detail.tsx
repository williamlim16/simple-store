import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import BeatLoader from 'react-spinners/BeatLoader'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { getProduct, getProducts } from '../product/product.service'
import { Product } from '../types/product.type'
import StarRating from '../components/StarRating'
import '@splidejs/react-splide/css'
import { ProductApi } from '../types/api.type'
import ProductCard from '../components/Card'
import Button from '../components/Button'
import useCart from '../cart/cart.service'

export function Detail() {
  const { productId } = useParams()
  const { addProductToCart } = useCart()

  const {
    isLoading,
    isError,
    error,
    data: product,
  } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: (queryKey) => getProduct(queryKey),
  })

  const { data: products } = useQuery<ProductApi, Error>(
    'products',
    getProducts
  )

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: error?.message,
      })
    }
  }, [isError, error])

  const navigate = useNavigate()
  function redirect(id: number) {
    navigate(`/product/${id}`)
  }

  return (
    <div>
      {isLoading ? (
        <div className="mt-24 flex justify-center">
          <BeatLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="mx-5 mt-10 text-3xl">Product Details</p>
          <Button
            onClick={() => {
              navigate('/cart')
            }}
            type="button"
          >
            Cart
          </Button>
          <div className="m-10 flex flex-wrap overflow-hidden rounded-xl shadow-lg">
            <div className=" w-full md:w-80 ">
              <Splide
                options={{ rewind: true }}
                aria-label="React Splide Example"
              >
                {product?.images.map((element) => (
                  <SplideSlide key={element}>
                    <div
                      className="h-64 w-full bg-cover"
                      style={{
                        backgroundImage: `url(${element})`,
                      }}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
            <div className="my-10 ml-10 flex flex-col justify-center">
              {product ? (
                <>
                  <div className="text-md">{product?.title}</div>
                  <div className="text-2xl font-bold">${product?.price}</div>
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
                  <p>{product.category}</p>
                  <p>Stock:{product.stock}</p>
                  <StarRating rating={product.rating} />
                  <div className="mt-10">
                    <Button
                      onClick={() => {
                        addProductToCart(product)
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="m-5 overflow-hidden rounded-xl p-10 shadow-lg">
            {product?.description}
          </div>
          <p className=" mx-5 mt-10 text-3xl">Similar Products</p>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {products?.products
              ?.filter((el) => el.category === product?.category)
              .map((element) => (
                <ProductCard
                  product={element}
                  key={element.id}
                  onClick={() => {
                    return redirect(element.id)
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default Detail
