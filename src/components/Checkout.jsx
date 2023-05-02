import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../features/products/productSlice'
import { useParams } from 'react-router'

function Checkout() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  })

  const { name, price } = formData

  useEffect(() => {
    dispatch(fetchProductById(id)) // Fetch the product by ID
  }, [dispatch, id])

  useEffect(() => {
    setFormData({
      name: selectedProduct?.name || '',
      price: selectedProduct?.price || '',
    })
  }, [selectedProduct])
  return (
    <div class="w-full h-full p-6 bg-white border border-blue-200 shadow">
      <div className="grid grid-cols-1 gap-5">
        <div>
          <h2>Checkout Item</h2>
        </div>
        <div>
          <div>item</div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
