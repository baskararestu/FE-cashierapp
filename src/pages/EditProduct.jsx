import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editProductById,
  fetchProductById,
  getCategories,
} from "../features/products/productSlice";

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const categories = useSelector((state) => state.product.categories);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });

  const { name, price, description, category, stock, image } = formData;

  useEffect(() => {
    dispatch(fetchProductById(id)); // Fetch the product by ID
    dispatch(getCategories());
  }, [dispatch, id]);

  useEffect(() => {
    setFormData({
      name: selectedProduct?.name || "",
      price: selectedProduct?.price || "",
      description: selectedProduct?.description || "",
      category: selectedProduct?.category || "",
      stock: selectedProduct?.stock || "",
      image: selectedProduct?.image || "",
    });
  }, [selectedProduct]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "price" || name == "stock") {
      if (value >= 0) {
        setFormData({ ...formData, [name]: parseInt(value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editProductById(id, formData));
      toast.success("Product updated successfully"); //need to set if statement
      // navigate(`/my-product`);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  console.log(selectedProduct);

  return (
    <div className=" m-5 flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        <div className="max-w-2xl px-4 py-4 mx-auto lg:py-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Update product
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                value={price}
                onChange={handleInputChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                value={description}
                onChange={handleInputChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={category}
                onChange={handleInputChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                name="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                value={stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
