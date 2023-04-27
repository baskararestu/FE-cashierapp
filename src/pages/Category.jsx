import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'


const Category = () => {
  const [category, setCategory] = useState([])
  const [categoryEdit, setCategoryEdit] = useState({
    id: '',
    name: '',
    isOpen: false,
  })

  const categorySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
  })

  const store = async (value) => {
    await axios.post('http://localhost:3000/category/', value, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
      },
    })
  }

  const update = async (value) => {
   await axios.patch(`http://localhost:3000/category/${value.id}`, {"name": value.name}, {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
     }
   })
  }

  const fetchCategory = async () => {
    const response = await axios.get('http://localhost:3000/category/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
      },
    })

    setCategory(response.data.data)
  }

  useEffect(() => {
    fetchCategory()
  }, [])


  return (
    <div className='page-container py-6'>
      <h1 className='text-2xl uppercase font-bold w-fit border-b border-black'>Category</h1>

      <div className='flex sm:flex-row flex-col gap-3 py-10'>
        <div className='sm:w-1/3 w-full'>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={categorySchema}
            onSubmit={async (values) => {
              await store(values)
              toast('Category created successfully')
              values.name = ''
              fetchCategory()

            }}>
            {({ handleSubmit, values, errors }) => (
              <Form action='#' method='post'>
                <h3 className='uppercase font-bold w-fit mb-3'>Add New</h3>
                <div className='flex flex-col gap-y-4'>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='name'>Name</label>
                    <Field type='text'
                           name='name'
                           id='name'
                           className='border border-gray-400 rounded-sm px-2 py-1'
                           value={values.name}
                    />
                    {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                  </div>
                  <button type='submit' className='bg-orange-400 text-white px-4 py-2 rounded-sm uppercase font-bold'>
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className='sm:w-3/4 w-full'>
          <h3 className='uppercase font-bold w-fit mb-3'>Category List</h3>
          <table className='w-full'>
            <thead>
            <tr>
              <th className='border border-gray-400 px-2 py-1'>Name</th>
              <th className='border border-gray-400 px-2 py-1'>Action</th>
            </tr>
            </thead>
            <tbody>
            {category.map((item, index) => (
              <tr key={index}>
                <td className='border border-gray-400 px-2 py-1'>{item.name}</td>
                <td className='border border-gray-400 px-2 py-1 w-[190px]'>
                  {/*<button className='bg-red-400 text-white px-2 py-1 rounded-sm uppercase font-bold mr-2'>*/}
                  {/*  Delete*/}
                  {/*</button>*/}
                  <button
                    onClick={() => setCategoryEdit({
                      id: item.id_category,
                      name: item.name,
                      isOpen: true,
                    })}
                    className='bg-blue-400 text-white px-2 py-1 rounded-sm uppercase font-bold'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <Dialog
          open={categoryEdit.isOpen}
          onClose={() => setCategoryEdit({ ...categoryEdit, isOpen: false })}
        >
          <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          <div className='fixed inset-0 flex justify-center items-center'>
            <div className='bg-white w-[500px] rounded-sm'>
              <div className='flex flex-col gap-y-4 p-4'>
                <h3 className='uppercase font-bold w-fit mb-3'>Edit Category</h3>
                <div className='flex flex-col gap-y-2'>
                  <Formik
                    initialValues={{
                      id: categoryEdit.id,
                      name: categoryEdit.name,
                    }}
                    validationSchema={categorySchema}
                    onSubmit={async (values) => {
                      await update(values)
                      toast('Category updated successfully')
                      setCategoryEdit({ ...categoryEdit, isOpen: false })
                      fetchCategory()
                    }}>
                    {({ handleSubmit, values, errors }) => (
                      <Form action='#' method='post' className="flex flex-col gap-y-2">
                        <label htmlFor='name'>Name</label>
                        <Field type='text'
                               name='name'
                               id='name'
                               className='border border-gray-400 rounded-sm px-2 py-1'
                        />

                        {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

                        <div className='flex justify-end gap-x-2'>
                          <button
                            onClick={() => setCategoryEdit({ ...categoryEdit, isOpen: false })}
                            className='bg-red-400 text-white px-4 py-2 rounded-sm uppercase font-bold'>
                            Cancel
                          </button>
                          <button className='bg-blue-400 text-white px-4 py-2 rounded-sm uppercase font-bold'>
                            Save
                          </button>
                        </div>
                      </Form>
                    )}

                  </Formik>
                </div>
              </div>
            </div>
          </div>

        </Dialog>


      </div>

    </div>
  )
}

export default Category