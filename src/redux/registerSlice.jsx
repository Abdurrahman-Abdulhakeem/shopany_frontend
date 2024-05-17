import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorToast from "../utils/errorToast";
import axiosInstance from "../utils/useAxios";
import successToast from "../utils/successToast";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (obj, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`api/v1/register/`, {
        first_name: obj.Fname,
        last_name: obj.Lname,
        email: obj.Email,
        phone_number: obj.PhoneNumber,
        password: obj.Password,
        confirm_password: obj.ConfirmPassword,
      });

      successToast(data.message + " proceed to login!");
      return data;
    } catch (error) {
      let errorMsg = "";
      if (error.response && error.response.data.error) {
        errorMsg = error.response.data.error[0];
      } else if (error.response && error.response.data.message) {
        errorMsg = error.response.data.message;
      } else if (error.response && error.response.data.detail) {
        errorMsg = error.response.data.detail;
      } else {
        errorMsg = error.message;
      }

      errorToast(errorMsg);
      console.log(error);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {},
  loading: false,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const registerState = (state) => state.register;

export default registerSlice.reducer;
