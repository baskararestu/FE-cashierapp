import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthNav from "../components/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Register() {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username cannot be empty")
      .min(4, "Username too short")
      .max(30),
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Wrong email format"),
    phone: Yup.string()
      .matches(/^[0-9]*$/, "Phone must be a number")
      .matches(/^0/, "Phone must start with 0")
      .required("Phone is required")
      .min(7, "Invalid phone number")
      .max(15),

    store_name: Yup.string()
      .required("Store name is required")
      .min(3, "Store name too short")
      .max(30, "Store name too long"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, "Password too short")
      .max(30, "Password too long"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.user.user);

  const registerUser = async (value) => {
    let response = await axios.post("http://localhost:3000/auth", value);
    console.log(response);
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
          store_name: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(value) => {
          registerUser(value);
        }}
      >
        {(props) => {
          return (
            <div className=" flex flex-col items-center justify-center bg-gray-100 min-h-screen">
              <AuthNav />
              <div
                className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-3/4
          max-w-lg
          mt-28

        "
              >
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Welcome
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Enter your credentials to access your account
                </div>

                <div className="mt-10 ">
                  <Form action="#" method="POST" className="">
                    <div className="flex flex-col mb-5">
                      <label className="mb-1 text-xs tracking-wide text-gray-600">
                        Username :
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <AccountCircleIcon />
                        </div>
                        <Field
                          name="username"
                          autoComplete="username"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your username"
                        />
                        <ErrorMessage
                          component="div"
                          name="username"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="email"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        E-Mail Address:
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <AlternateEmailOutlinedIcon />
                        </div>
                        <Field
                          id="email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your email"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label className="mb-1 text-xs tracking-wide text-gray-600">
                        Phone :
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <PhoneIcon />
                        </div>
                        <Field
                          name="phone"
                          autoComplete="phone"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your phone"
                        />
                        <ErrorMessage
                          component="div"
                          name="phone"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label className="mb-1 text-xs tracking-wide text-gray-600">
                        Store Name :
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <StoreIcon />
                        </div>
                        <Field
                          name="store_name"
                          autoComplete="store_name"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your store name"
                        />
                        <ErrorMessage
                          component="div"
                          name="store_name"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <label
                        htmlFor="password"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >
                        Password:
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <LockOutlinedIcon />
                        </div>

                        <Field
                          id="password"
                          type="password"
                          name="password"
                          autoComplete="current-password"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your password"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>

                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                      >
                        <span className="mr-2 uppercase">Sign Up</span>
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="flex justify-center items-center my-6">
                <a
                  href="#"
                  target="_blank"
                  className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
                >
                  <span className="ml-2">
                    Already have an account?
                    <a
                      href="/register"
                      className="text-xs ml-2 text-blue-500 font-semibold hover:underline"
                    >
                      Sign In
                    </a>
                  </span>
                </a>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
