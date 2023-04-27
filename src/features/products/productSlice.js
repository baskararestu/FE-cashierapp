import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        pagination: {
            current: 0,
            total: 0
        }
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        }
    }
});

export const {setProducts, setPagination} = productSlice.actions;

export default productSlice.reducer;


export function fetchProducts(page) {
    return async (dispatch) => {
        try {
            // axios with auth jwt
            const response = await axios.get(`http://localhost:3000/product?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`
                }
            });
            dispatch(setProducts(response.data.data));
            dispatch(setPagination(response.data.pages));
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    };
}