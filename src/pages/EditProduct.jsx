import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  editProductById,
  fetchProductById,
  getCategories,
} from '../features/products/productSlice'
import { json } from 'react-router'

function EditProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const categories = useSelector((state) => state.product.categories)
  const [product, setProduct] = useState({})

  // const { name, price, description, category, stock, image } = formData;

  useEffect(() => {
    dispatch(fetchProductById(id)) // Fetch the product by ID
    dispatch(getCategories())
  }, [dispatch, id])

  useEffect(() => {
    setProduct({
      name: selectedProduct?.name || '',
      price: selectedProduct?.price || '',
      description: selectedProduct?.description || '',
      category: selectedProduct?.id_category || '',
      stock: selectedProduct?.stock || '',
      image: selectedProduct?.image || '',
    })
  }, [selectedProduct])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name == 'price' || name == 'stock') {
      // alert("Im price");
      if (value >= 0) {
        setProduct({ ...product, [name]: parseInt(value) })
      }
    } else {
      setProduct({ ...product, [name]: value })
    }
    console.log(product)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('price', parseInt(product.price))
      formData.append('description', product.description)
      formData.append('category', parseInt(product.category))
      formData.append('stock', parseInt(product.stock))
      formData.append('image', product.image)
      // console.log(product)
      await dispatch(editProductById(id, formData))
      toast.success('Product updated successfully') //need to set if statement
      navigate(`/my-product`);
    } catch (error) {
      console.error(error)
      toast.error('An error occurred. Please try again later.')
    }
  }


  return (
    <div className=' m-5 flex justify-center items-center min-h-screen'>
      <div className='max-w-lg w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow '>
        <div className='max-w-2xl px-4 py-4 mx-auto lg:py-8'>
          <h2 className='mb-4 text-xl font-bold text-gray-900'>
            Update product
          </h2>
        </div>
        <form onSubmit={handleSubmit}
              encType={'multipart/form-data'}
        >
          <div className='grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5'>
            <div className='sm:col-span-2'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Product Name
              </label>
              <input
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5'
                type='text'
                name='name'
                value={product?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='brand'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Price
              </label>
              <input
                type='number'
                name='price'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                value={product?.price}
                onChange={handleInputChange}
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='brand'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Description
              </label>
              <textarea
                name='description'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                value={product?.description}
                onChange={handleInputChange}
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='brand'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Category  {product?.category}
              </label>
              <select
                name='category'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                value={product?.category}
                onChange={handleInputChange}
              >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id_category} value={category.id_category}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Image
              </label>

              <img
                src={product?.preview || `http://localhost:3000${product?.image}`}
                alt='product'
                className='w-20 h-20 object-cover' />

              <input
                type='file'
                name='image'
                accept='image/*'
                onChange={(event) => {
                  setProduct({ ...product, image: event.target.files[0], preview: URL.createObjectURL(event.target.files[0]) })
                }}
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='brand'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Price
              </label>
              <input
                type='number'
                name='stock'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                value={product?.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg'
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
