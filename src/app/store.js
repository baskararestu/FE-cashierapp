import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import productSlice from "../features/products/productSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
  },
});
