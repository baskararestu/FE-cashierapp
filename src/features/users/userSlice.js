import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      phone: "",
      store_name: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;

export function loginUser(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      console.log(response.data);
      if (response.data) {
        alert("Success!");
        dispatch(setUser(response.data.user));
        const token = response.data.token;
        localStorage.setItem("user_token", token);
        console.log("Token stored:", token);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}
