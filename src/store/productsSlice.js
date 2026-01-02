import { createSlice } from "@reduxjs/toolkit";
import AddCategory from "../components/AddCategory";
const initialState = {
  list: [],
  categories: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allItems: (state) => {
      console.log("Running")
      const data = localStorage.getItem("items");
      try {
        const parseData = data ? JSON.parse(data) : [];
        state.list = Array.isArray(parseData) ? parseData.reverse() : [];
        console.log("ye rahi list"+parseData)
      } catch(error) {
        state.list = [];
        console.error("Failed to parse localStorage items:", error);
      }
    },

    addCategory : (state, action) => {
      const getCategories = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
      getCategories.push(action.payload);
      localStorage.setItem("categories", JSON.stringify(getCategories));
      state.categories = getCategories;
    },

  

  

  },
});

export const { allItems , addCategory } = productSlice.actions;

export default productSlice.reducer;
