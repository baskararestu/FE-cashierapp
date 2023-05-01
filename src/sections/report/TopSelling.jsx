import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { fetchProducts } from '../../features/products/productSlice'

const DailySales = () => {
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState({
    category: '',
  })
  const [topSelling, setTopSelling] = useState({
    data: [],
    pages: {},
  })

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      })
      setCategories(response.data.data)
    } catch (error) {
      toast.error('Error fetching categories')
    }
  }

  const fetchDailySales = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transaction/top-selling-products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        params: {
          category: filter.category,
        },
      })

      setTopSelling({
        data: response.data.data,
        pages: response.data.pages,
      })
    } catch (error) {
      console.error(error)
      // Handle error appropriately
      toast.error(error.message || 'Error fetching daily sales')
    }
  }

  useEffect(() => {
    const getData = async () => {
      // await Promise.all([fetchCategories(), fetchDailySales()])
      await fetchCategories()
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      await fetchDailySales()
    }
    getData()
  }, [filter])


  return (
    <div className='top-selling'>
      <h3 className='text-lg uppercase font-semibold py-6'>List of Top Selling Product</h3>

      <div className='flex flex-row gap-5'>
        <div className='filter sm:w-1/3 w-full'>
          <div className='flex flex-col justify-start border p-2 gap-3'>
            <label htmlFor='filter' className='w-[120px]'>Filter Category</label>
            <div className='gap-2 flex flex-row flex-wrap'>
              <button
                onClick={() => setFilter({
                  category: null,
                })}
                className={`${filter.category === null ? '!border-orange-300 border-2' : ''} border border-gray-300 uppercase rounded-md px-2 py-1`}>
                ALL
              </button>
              {
                categories.map(category => (
                  <button key={category?.id_category}
                          onClick={() => setFilter({
                            category: category?.id_category,
                          })}
                          className={`${filter.category === category?.id_category ? '!border-orange-300 border-2' : ''} border border-gray-300 uppercase rounded-md px-2 py-1 `}>
                    {category.name}
                  </button>
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full'>
          <table className='w-full'>
            <thead>
            <tr>
              <th className='border border-gray-300 px-2 py-1'>#</th>
              <th className='border border-gray-300 px-2 py-1'>Product Name</th>
              <th className='border border-gray-300 px-2 py-1'>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {
              topSelling.data.length > 0 ? (
                topSelling.data.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td className='border border-gray-300 px-2 py-1'>{index + 1}</td>
                      <td className='border border-gray-300 px-2 py-1'>{product.name}</td>
                      <td className='border border-gray-300 px-2 py-1'>{product.total_quantity}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className='border border-gray-300 px-2 py-1' colSpan={3}>No data</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DailySales