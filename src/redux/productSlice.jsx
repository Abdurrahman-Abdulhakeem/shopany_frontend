import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";
import errorToast from "../utils/errorToast";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("api/v1/products/");

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
      thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`api/v1/product/${id}/`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  "category/getProductByCategory",
  async (category, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(
        `api/v1/products/?category=${category}`
      );

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

export const getSearchProducts = createAsyncThunk(
  "product/getSearchProducts",
  async (query, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(
        `api/v1/products/?query=${query}`
      );
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsByCategories: {},
    productCategory: [],
    queryProducts: [],
    bestSelling: [],
    recentProducts: [],
    query: '',
    currentProduct: null,
    similarProducts: {},
    loading: false,
    error: null,
  },

  reducers: {
    incrementProduct: (state, action) => {
      //////Increment for any product
      const product = state.products.find(
        (product) => product.id === action.payload.dataId
      );

      //////Increment for products in selected category
      const productCategory =
        state.productCategory.data &&
        state.productCategory.data.find(
          (product) => product.id === action.payload.dataId
        );

      //////Increment for products in productByCategory on dashboard

      let categoryIds;
      state.products.forEach((product) => {
        categoryIds = new Set(
          product.categories.map((category) => category.id)
        );
      });

      categoryIds.forEach((categoryId) => {
        const productIndex = state.productsByCategories[
          categoryId
        ].products.findIndex((p) => p.id === action.payload.dataId);

        if (productIndex !== -1) {
          state.productsByCategories[categoryId].products[productIndex]
            .quantity++;
        }
      });

      //////Increment................................................................
      product && product.quantity++;
      productCategory && productCategory.quantity++;
      state.currentProduct && state.currentProduct.quantity++;
    },

    decrementProduct: (state, action) => {
      //////Decrement for any product
      const product = state.products.find(
        (product) => product.id === action.payload.dataId
      );

      //////Decrement for products in selected category
      const productCategory =
        state.productCategory.data &&
        state.productCategory.data.find(
          (product) => product.id === action.payload.dataId
        );

      //////Decrement for products in productByCategory on dashboard

      let categoryIds;
      state.products.forEach((product) => {
        categoryIds = new Set(
          product.categories.map((category) => category.id)
        );
      });

      categoryIds.forEach((categoryId) => {
        const productIndex = state.productsByCategories[
          categoryId
        ].products.findIndex((p) => p.id === action.payload.dataId);

        if (
          productIndex !== -1 &&
          state.productsByCategories[categoryId].products[productIndex]
            .quantity > 1
        ) {
          state.productsByCategories[categoryId].products[productIndex]
            .quantity--;
        }
      });

      //////Decrement................................................................
      if (
        product.quantity > 1 ||
        (state.currentProduct && state.currentProduct.quantity > 1)
      ) {
        product.quantity--;
        state.currentProduct && state.currentProduct.quantity--;
      }

      if (productCategory && productCategory.quantity > 1) {
        productCategory.quantity--;
      }
    },

    incrementSimilarProduct(state, action) {
      const productId = action.payload.dataId;
      const productIndex = state.similarProducts.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        state.similarProducts[productIndex].quantity++;
      }
    },
    decrementSimilarProduct(state, action) {
      const productId = action.payload.dataId;
      const productIndex = state.similarProducts.findIndex(
        (product) => product.id === productId
      );
      if (
        productIndex !== -1 &&
        state.similarProducts[productIndex].quantity > 1
      ) {
        state.similarProducts[productIndex].quantity--;
      }
    },

    incrementQueryProduct(state, action) {
      const productId = action.payload.dataId;
      const productIndex = state.queryProducts.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        state.queryProducts[productIndex].quantity++;
      }
    },
    decrementQueryProduct(state, action) {
      const productId = action.payload.dataId;
      const productIndex = state.queryProducts.findIndex(
        (product) => product.id === productId
      );
      if (
        productIndex !== -1 &&
        state.queryProducts[productIndex].quantity > 1
      ) {
        state.queryProducts[productIndex].quantity--;
      }
    },

    setQuery: (state, action) => {
      state.query = action.payload;
    },

    resetQuery: (state, action) => {
      state.queryProducts = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        /////Get products by categories
        action.payload.data.forEach((product) => {
          const categoryIds = new Set(
            product.categories.map((category) => category.id)
          );

          categoryIds.forEach((categoryId) => {
            if (!state.productsByCategories[categoryId]) {
              state.productsByCategories[categoryId] = {
                id: categoryId,
                name: product.categories.find(
                  (category) => category.id === categoryId
                ).name,
                products: [],
              };
            }
            const isProductAdded = state.productsByCategories[
              categoryId
            ].products.findIndex((p) => p.id === product.id);
            if (isProductAdded === -1) {
              state.productsByCategories[categoryId].products.push(product);
            }
          });
        });

        state.products = action.payload.data;
        state.recentProducts = action.payload.recent_products
        state.bestSelling = action.payload.best_selling
        state.loading = false;
        state.error = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload;

        // Find similar products based on categories of the current product
        const similarProductIds = new Set(); // Store unique product IDs for similar products

        state.products.forEach((product) => {
          product.categories.forEach((category) => {
            if (
              state.currentProduct.categories.some(
                (currentCategory) => currentCategory.id === category.id
              ) &&
              state.currentProduct.id !== product.id
            ) {
              similarProductIds.add(product.id);
            }
          });
        });

        // Filter products based on unique product IDs
        state.similarProducts = state.products.filter((product) =>
          similarProductIds.has(product.id)
        );

        state.loading = false;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.productCategory = action.payload;
        state.loading = false;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProductByCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.queryProducts = action.payload.data;
        state.loading = false;
      })
      .addCase(getSearchProducts.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const productState = (state) => state.product;
export const {
  incrementProduct,
  decrementProduct,
  incrementSimilarProduct,
  decrementSimilarProduct,
  incrementQueryProduct,
  decrementQueryProduct,
  setQuery,
  resetQuery,
} = productSlice.actions;
export default productSlice.reducer;
