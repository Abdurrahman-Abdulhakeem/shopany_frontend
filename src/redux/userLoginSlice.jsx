import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";
import successToast from "../utils/successToast";
import errorToast from "../utils/errorToast";

export const logoutAction = () => {
  localStorage.removeItem("shopany-user");
  localStorage.removeItem("active-user");
  window.location.pathname = "/login";
};

export const login = createAsyncThunk("user/login", async (obj, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post("api/v1/login/", obj);

    localStorage.setItem("shopany-user", JSON.stringify(data));
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
    errorToast(`Oops,  ${errorMsg}`);
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("shopany-user")
      ? JSON.parse(localStorage.getItem("shopany-user"))
      : null,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        successToast(action.payload.message);
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const userLoginState = (state) => state.user;
export default userLoginSlice.reducer;
