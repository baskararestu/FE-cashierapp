import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCartItem,
  clearCart,
  removeCartItem,
} from '../features/products/productSlice'

function Checkout() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.product.cartItems)
  const [product, setProduct] = useState([])
  const totalPrice = useSelector((state) => state.product.totalPrice)

  const handleMinusClick = (product) => {
    dispatch(addCartItem(product, -1))
  }

  const handlePlusClick = (product) => {
    dispatch(addCartItem(product, 1))
  }

  const handleClearItem = (id_product) => {
    dispatch(removeCartItem(id_product))
    console.log(id_product)
  }

  const handleClearCart = (product) => {
    dispatch(clearCart(product))
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
  console.log(totalPrice)

  console.log(cart)
  return (
    <div className="container ">
      <div className="flex shadow-md ">
        <div className="w-full bg-slate-100 px-3 py-3 min-h-screen">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Transactions</h1>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Product Details</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr className="gap-5">
                  <td className="px-4 py-2">
                    <div className="grid grid-cols-2">
                      <div>
                        <div>{item.name}</div>
                        <button
                          className="text-xs px-1 py-0.5  text-white bg-red-500 rounded-md hover:bg-red-600"
                          onClick={() => {
                            handleClearItem(item.id_product)
                          }}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 flex justify-center items-center">
                    <button
                      onClick={() => {
                        handleMinusClick(item)
                      }}
                      className="mx-2"
                    >
                      -
                    </button>
                    <div>{item.quantity}</div>
                    <button
                      onClick={() => {
                        handlePlusClick(item)
                      }}
                      className="mx-2"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <div>{item.price}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end my-3 mx-4 gap-3">
            <div>Total: </div>
            <div>{totalPrice}</div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => {}}
            >
              Checkout
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => {
                handleClearCart()
              }}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
