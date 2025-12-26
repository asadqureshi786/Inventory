import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice";
import Products from "../pages/Products";
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
