import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  getCategories,
} from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Button, Card, CardActions, CardContent } from "@mui/material";

function AddProductForm() {
  const [product, setProduct] = useState({ price: 0, stock: 0 });
  const [isProductAdded, setIsProductAdded] = useState(false); // Flag to indicate if product has been successfully added

  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const fetchCategoriesData = async () => {
    try {
      const data = await dispatch(getCategories());
      // console.log("categories data:", data);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while fetching categories. Please try again later."
      );
    }
  };
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // console.log("categories:", categories);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "price" || name == "stock") {
      // alert("Im price");
      if (value >= 0) {
        setProduct({ ...product, [name]: parseInt(value) });
      }
    } else {
      setProduct({ ...product, [name]: value });
    }
    console.log(product);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", parseInt(product.price));
    formData.append("description", product.description);
    formData.append("category", parseInt(product.category));
    formData.append("stock", parseInt(product.stock));
    formData.append("image", product.image);
    console.log(product);
    try {
      let response = await dispatch(addProductAsync(formData));
      console.log(response.message);
      console.log(response.isSuccess);
      if (response.isSuccess) {
        toast("Add product success");
        navigate("/my-product");
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while adding the product. Please try again later."
      );
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    if (name === "category") {
      try {
        const data = await dispatch(getCategories());
        console.log("categories data:", data);
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred while fetching categories. Please try again later."
        );
      }
    }
  };

  return (
    <div className="container w-full m-10 flex flex-col items-center  ">
      <div className=" font-bold  mb-3 ">
        <h2>Add Product</h2>
      </div>

      <Card sx={{ width: "100%", maxWidth: 700 }}>
        <CardContent>
          <div className=" w-full h-auto  border-solid rounded ">
            <form
              onSubmit={async (values) => {
                await handleFormSubmit(values);
              }}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 gap-2">
                <div className="grid grid-cols-1 gap-0.5">
                  <div>
                    <label htmlFor="name" className="border-solid rounded-sm">
                      Name:
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      className=" text-sm bg-gray-50 rounded-lg border border-gray-400 w-full py-2"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  <div>
                    <label htmlFor="price">Price:</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      className=" text-sm bg-gray-50 rounded-lg border border-gray-400 w-full py-2"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  <div>
                    <label htmlFor="description">Description:</label>
                  </div>
                  <div>
                    <textarea
                      name="description"
                      value={product.description}
                      className=" text-sm bg-gray-50 rounded-lg border border-gray-400 w-full py-2"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols gap-0.5">
                  <div>
                    <label htmlFor="category">Category:</label>
                  </div>
                  <div>
                    <select
                      name="category"
                      value={product.category}
                      className=" text-sm bg-gray-50 rounded-lg border border-gray-400 w-full py-2"
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <option
                            key={category.id_category}
                            value={category.id_category}
                          >
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Loading categories...
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  <div>
                    <label htmlFor="stock">Stock:</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      className=" text-sm bg-gray-50 rounded-lg border border-gray-400 w-full py-2"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  <div>
                    <label htmlFor="image">Image:</label>
                  </div>
                  <div>
                    <input
                      type="file"
                      name="image"
                      className="w-full py-2"
                      onChange={(event) =>
                        setProduct({ ...product, image: event.target.files[0] })
                      }
                    />
                  </div>
                </div>
                <CardActions>
                  <Button type="submit" variant="contained" size="small">
                    Save
                  </Button>
                </CardActions>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddProductForm;
