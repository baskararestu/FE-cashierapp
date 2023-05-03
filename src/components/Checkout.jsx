import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addCartItem, addToCart, setCartItems } from '../features/products/productSlice'

function Checkout() {
  const dispatch = useDispatch()
  // const { id } = useParams()
  const cart = useSelector((state) => state.product.cartItems)
  const [product, setProduct] = useState([])
  // const [quantity, setQuantity] = useState(1) // Define quantity in the component's state

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity)
  // }

  const handleMinusClick = (product) => {
    dispatch(addCartItem(product, -1))
  }

  const handlePlusClick = (product) => {
    dispatch(addCartItem(product, 1))
  }

  useEffect(() => {
    // Create an array of product objects from the cart array
    const products = cart.map((item) => ({
      name: item?.product?.name || '',
      price: item?.product?.price || '',
      quantity: item?.quantity || 1, // set the initial quantity to 1 if it's not already set
    }))

    // Set the product state with the array of product objects
    setProduct(products)
  }, [cart])

  console.log(product)
  // console.log(quantity)

  console.log(cart)
  return (
    <div class='w-full h-full p-6 bg-white border border-blue-200 shadow'>
      <div className='grid grid-cols-1 gap-5'>
        <div>
          <h2>Checkout Item</h2>
        </div>
        <div>
          {cart.map((item, index) => (
            <div className='grid grid-rows-4'>
              <div>
                <button
                  onClick={() => {
                    handlePlusClick(item)
                  }}
                >
                  +
                </button>
              </div>
              <div>
                <div>{item.quantity}</div>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleMinusClick(item)
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <div>{item.name}</div>
              </div>
              <div>
                <div>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Checkout
