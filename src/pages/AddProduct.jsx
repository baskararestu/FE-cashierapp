import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  getCategories,
} from "../features/products/productSlice";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

function AddProductForm() {
  const [product, setProduct] = useState({});
  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();

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
    setProduct({ ...product, [name]: value });
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
    // console.log(product);
    try {
      await dispatch(addProductAsync(formData));
      // setProduct({
      //   name: "",
      //   price: "",
      //   description: "",
      //   category: "",
      //   stock: "",
      //   image: "",
      // });
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
        // console.log("categories data:", data);
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred while fetching categories. Please try again later."
        );
      }
    }
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="container m-10 flex flex-col items-center  ">
      <div className="flex font-bold items-center justify-center mb-10">
        <h2>Add Product</h2>
      </div>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className=" w-3/4 h-auto mx-14  border-solid rounded ">
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label htmlFor="name" className="border-solid rounded-sm">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    className=""
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="category">Category:</label>
                  <select
                    name="category"
                    value={product.category}
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
                <div>
                  <label htmlFor="stock">Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={(event) =>
                      setProduct({ ...product, image: event.target.files[0] })
                    }
                  />
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
