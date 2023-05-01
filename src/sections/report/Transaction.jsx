import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { fetchProducts } from '../../features/products/productSlice'
import DatePicker from 'react-datepicker'

const Transaction = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [totalTransaction, setTotalTransaction] = useState({
    data: [],
    pages: {},
  })



  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }


  const fetchTotalTransaction = async () => {
    const response = await axios.get('http://localhost:3000/transaction/total', {
      params: {
        start_date: new Date(startDate).toISOString().split('T')[0],
        end_date: new Date(endDate).toISOString().split('T')[0],
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
    })


    setTotalTransaction({
      data: response.data.data,
      pages: response.data.pages,
    })
  }

  useEffect(() => {
    const getData = async () => {
      await fetchTotalTransaction()
    }

    getData()
  }, [startDate, endDate])


  return (
    <div className='top-selling'>
      <h3 className='text-lg uppercase font-semibold py-6'>List of Total Transaction by Day</h3>

      <div className='flex flex-row gap-5'>
        <div className='filter sm:w-1/3 w-full'>
          <div className='flex flex-col justify-start border p-2 gap-3'>
            <form action=''>
              <div className='flex flex-col justify-start border p-2'>
                <label htmlFor='dateFilter' className='w-[120px]'>Filter Date</label>
                <DatePicker
                  id='dateFilter'
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className='border border-gray-300 rounded-md px-2 py-1'
                />
              </div>
            </form>
          </div>
        </div>
        <div className='w-full'>
          <table className='w-full'>
            <thead>
            <tr>
              <th className='border border-gray-300 px-2 py-1'>#</th>
              <th className='border border-gray-300 px-2 py-1'>Date</th>
              <th className='border border-gray-300 px-2 py-1'>Total</th>
              <th className='border border-gray-300 px-2 py-1'>Income</th>
            </tr>
            </thead>
            <tbody>
            {
              totalTransaction.data.length > 0 ? (
                totalTransaction.data.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td className='border border-gray-300 px-2 py-1'>{index + 1}</td>
                      <td className='border border-gray-300 px-2 py-1'>{
                        new Date(product.transaction_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })
                      }</td>
                      <td className='border border-gray-300 px-2 py-1'>
                        {product.total_quantity}
                      </td>
                      <td className='border border-gray-300 px-2 py-1'>
                        {
                          new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(product.gross_income)
                        }
                      </td>
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

export default Transaction