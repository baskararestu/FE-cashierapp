import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProductById } from "../features/products/productSlice";

function EditProduct() {
  const editProductSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    // phone: Yup.number().matches(/^[0-9]*$/, "Phone must be a number"),
    image: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    // stock: Yup.number().matches(/^[0-9]*$/, "Phone must be a number"),
  });
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editProduct = async (value) => {
    const data = await dispatch(editProductById());
  };

  return (
    <div>
      <Formik
        initialValues={{
          selectedProduct,
        }}
        validationSchema={editProductSchema}
        onSubmit={async (value) => {
          await editProduct(value);
          toast("Register success");
          navigate("/login");
        }}
      >
        {(props) => {
          return (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <p>test</p>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default EditProduct;
