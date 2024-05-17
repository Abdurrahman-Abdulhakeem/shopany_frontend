import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import productReducer from "../redux/productSlice";
import userLoginReducer from "../redux/userLoginSlice";
import getUserReducer from "../redux/getUserSlice";
import categoryReducer from "../redux/categorySlice";
import registerReducer from "../redux/registerSlice";
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    register: registerReducer,
    user: userLoginReducer,
    getUser: getUserReducer,
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
