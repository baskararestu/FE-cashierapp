import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import AddProduct from "./pages/AddProduct";

function App() {
  const userToken = localStorage.getItem("user_token");

  const location = useLocation();

  useEffect(() => {
    // Redirect to the login page if the user token is not present
    // and the current page is not the login or register page
    if (
      !userToken &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      window.location.replace("/login");
    }

    // Redirect to the dashboard page if the user token is present
    // and the current page is the login or register page
    if (
      userToken &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      window.location.replace("/dashboard");
    }
  }, [userToken, location.pathname]);

  return (
    <div>
      <Layout>
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
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
