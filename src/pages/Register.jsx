import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthNav from "../components/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-100">
              <AuthNav />
              {/* <div
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
          w-50
          max-w-md
          mt-5
        "
              >
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Welcome
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Enter your credentials to access your account
                </div>

                <div className="mt-10 ">
                  <Form action="#" method="POST">
                    <div className="flex flex-col mb-5">
                      <label className="mb-1 text-xs tracking-wide text-gray-600">
                        Username :
                      </label>
                      <div className="relative">
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
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <span>
                            <svg
                              fill="none"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="w-6 stroke-blue-500 absolute top-1.5 left-1.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                              ></path>
                            </svg>
                          </span>
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
                      <div className="mt-5 flex flex-row justify-end">
                        <a
                          href="/user/forget-password"
                          className="text-xs ml-2 text-blue-500 font-semibold hover:underline "
                        >
                          Forget Password?
                        </a>
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
                        <span className="mr-2 uppercase">Sign In</span>
                        <span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
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
                    You don't have an account?
                    <a
                      href="/register"
                      className="text-xs ml-2 text-blue-500 font-semibold hover:underline"
                    >
                      Register now
                    </a>
                  </span>
                </a>
              </div> */}
              Register
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
