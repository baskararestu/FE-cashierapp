import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import AddProductForm from './pages/AddProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MyProduct from './pages/Myproduct'
import EditProduct from './pages/EditProduct'

import Report from './pages/Report'
import Category from './pages/Category'

function App() {
  const userToken = localStorage.getItem('user_token')

  const location = useLocation()

  useEffect(() => {
    // Redirect to the login page if the user token is not present
    // and the current page is not the login or register page
    if (
      !userToken &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      window.location.replace('/login')
    }

    // Redirect to the dashboard page if the user token is present
    // and the current page is the login or register page
    if (
      userToken &&
      (location.pathname === '/login' || location.pathname === '/register')
    ) {
      window.location.replace('/dashboard')
    }
  }, [userToken, location.pathname])

  return (
    <div>
      <Layout>
        <ToastContainer />
        <Routes>
          {/* Render the login and register pages only if the user is not logged in */}
          {!userToken && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-product" element={<MyProduct />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
