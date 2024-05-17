import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { axiosFormInstance } from "../utils/useAxios";
import errorToast from "../utils/errorToast";
import successToast from "../utils/successToast";

export const getUser = createAsyncThunk("getUser/user", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("api/v1/user/");
    localStorage.setItem("active-user", JSON.stringify(data));
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
    console.log(errorMsg, error);
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

export const uploadImage = createAsyncThunk(
  "user/uploadImage",
  async (imageFile, thunkAPI) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(1000);
      const { data } = await axiosFormInstance.post("api/v1/user/", {
        image: imageFile,
      });

      successToast(data.message);
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
      console.log(errorMsg, error);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (obj, thunAPI) => {
    try {
      const { data } = await axiosInstance.post(
        `api/v1/user/change-password/`,
        {
          new_password: obj.newPassword,
          confirm_new_password: obj.confirmNewPassword,
        }
      );

      successToast(data.message)

      return data
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
      errorToast(errorMsg)
      return thunAPI.rejectWithValue(errorMsg)
    }
  }
);

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    userData: null,
  },
  loading: false,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.userData.image = action.payload.data.image;
        state.loading = false;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const getUserState = (state) => state.getUser;
export default getUserSlice.reducer;
