import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    pagination: {
      current: 0,
      total: 0,
    },
    categories: [],
    selectedProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setProducts,
  setPagination,
  addProduct,
  setCategories,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts(page) {
  return async (dispatch) => {
    try {
      // axios with auth jwt
      const response = await axios.get(
        `http://localhost:3000/product?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );
      dispatch(setProducts(response.data.data));
      dispatch(setPagination(response.data.pages));
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}

export function addProductAsync(product) {
  return async (dispatch) => {
    console.log(product);
    try {
      const response = await axios.post(
        "http://localhost:3000/product/add-product",
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );
      dispatch(addProduct(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}

export function editProductAsync(id) {
  return async (dispatch) => {
    // Use the productId argument to construct the API URL
    try {
      const response = await axios.put(
        `http://localhost:3000/product/edit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );
      dispatch(addProduct(response.data));
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    // Fetch categories
    const categoryResponse = await axios.get(
      `http://localhost:3000/category/get-category`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      }
    );
    dispatch(setCategories(categoryResponse.data.data));
  };
}
export function fetchProductById(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });
      dispatch(setProduct(response.data)); // dispatch setProduct action with fetched product
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}

export function editProductById(id, productData) {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `http://localhost:3000/product/edit/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );
      dispatch(setProducts(response.data)); // dispatch setProduct action with fetched product
      dispatch(fetchProducts()); // refresh our products list
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}
export function deleteProduct(productId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );
      // setTimeout(() => {
      const updatedProducts = getState().product.products.filter(
        (product) => productId !== product.id_product
      );
      dispatch(setProducts(updatedProducts));
      // }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // alert("An error occurred. Please try again later.(deleted)");
    }
  };
}

// export const setSelectedProduct = (product) => {
//   return {
//     type: "product/setSelectedProduct",
//     payload: product,
//   };
// };
