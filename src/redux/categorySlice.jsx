import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("api/v1/categories/");
      return data;
    } catch (error) {
      let errorMsg = "";
      if (error.response && error.response.data.error) {
        errorMsg = error.response.data.error[0];
      } else if (error.response && error.response.data.message) {
        errorMsg = error.response.data.message;
      } else if (error.response && error.response.detail) {
        errorMsg = error.response.detail;
      } else {
        errorMsg = error.message;
      }

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);



const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
   
  },
});

export const categoryState = (state) => state.category;
export default categorySlice.reducer;
