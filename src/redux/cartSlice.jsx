import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";
import successToast from "../utils/successToast";
import errorToast from "../utils/errorToast";

// let cachedData;
// let lastTimeFetch;

// let currentTime = new Date().getTime();

export const getCarts = createAsyncThunk(
  "cart/getCarts",
  async (_, thunkAPI) => {
    // if(cachedData && currentTime - lastTimeFetch < 6000) {
    //   return cachedData;
    // }

    // function delay(ms) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    try {
      // await delay(1000);

      const { data } = await axiosInstance.get(`api/v1/carts/`);

      // cachedData = data;
      // lastTimeFetch = currentTime;

      return data;
    } catch (error) {
      console.log(error);
      errorToast(`Oops! ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "product/addProductToCart",
  async (product, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`api/v1/addcart/`, {
        product_id: product.id,
        quantity: product.quantity,
      });
      successToast(`${data.message}`);

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
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ dataId, update_item }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`api/v1/cart/${dataId}/`, {
        update_item,
      });
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
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`api/v1/cart/${id}/`);
      errorToast(data.message);
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
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const deleteCarts = createAsyncThunk(
  "cart/deleteCarts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete("api/v1/carts/delete/");
      errorToast(data.message);
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
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const totalCartPrice = createAsyncThunk(
  "cart/totalCartPrice",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("api/v1/carts/totalprice/");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const payoutCarts = createAsyncThunk(
  "cart/payoutCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("api/v1/carts/payout/");

      window.open(data.payment_url, "_blank");

      // const verify_response = await axiosInstance.post(
      //   "api/v1/carts/payout/verify/",
      //   { reference: data.reference }
      // );

      // if (verify_response.data.status === "success") {
      //   successToast(verify_response.data.message);
      // } else {
      //   errorToast(verify_response.data.message);
      // }

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
      console.log(error);
      errorToast(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    totalPrice: 0,
    loading: false,
    isModalOpen: false,
    error: false,
    paymentLoading: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.loading = false;
        // state.totalPrice = state.carts.reduce(
        //   (sum, cart) => sum + cart.amount,
        //   0
        // );
      })
      .addCase(getCarts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.carts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateCart.fulfilled, (state, action) => {
        // state.loading = false
        const cartIndex = state.carts.findIndex(
          (cart) => cart.id === action.payload.data?.id
        );

        if (cartIndex !== -1) {
          if (action.payload.method === "plus") {
            state.carts[cartIndex].quantity += 1;
          }
          if (action.payload.method === "minus") {
            state.carts[cartIndex].quantity -= 1;
          }
        } else {
          state.carts = state.carts.filter(
            (cart) => cart.id !== action.payload.id
          );
        }
      })
      .addCase(updateCart.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(updateCart.rejected, (state) => {
        // state.loading = false;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.carts = state.carts.filter(
          (cart) => cart.id !== action.payload.id
        );
      })

      .addCase(totalCartPrice.fulfilled, (state, { payload }) => {
        const { total_price: totalPrice } = payload;
        state.totalPrice = totalPrice;
      })
      .addCase(deleteCarts.fulfilled, (state, action) => {
        state.carts = [];
        state.totalPrice = 0;
        state.loading = false;
        state.isModalOpen = false;
      })
      .addCase(deleteCarts.pending, (state, action) => {
        state.loading = true;
        state.isModalOpen = false;
      })
      .addCase(deleteCarts.rejected, (state, action) => {
        state.loading = false;
        state.isModalOpen = false;
      })
      .addCase(payoutCarts.fulfilled, (state, action) => {
        state.paymentLoading = false;
      })
      .addCase(payoutCarts.pending, (state, action) => {
        state.paymentLoading = true;
      })
      .addCase(payoutCarts.rejected, (state, action) => {
        state.paymentLoading = false;
      });
  },
});

export const cartState = (state) => state.cart;
export const { openModal, closeModal } = cartSlice.actions;
export default cartSlice.reducer;
