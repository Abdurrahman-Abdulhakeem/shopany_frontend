import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./screens/Dashboard";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import Sneakers from "./screens/Categories/Sneakers";
import FoodStuffs from "./screens/Categories/FoodStuffs";
import Groceries from "./screens/Categories/Groceries";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductDetail from "./screens/ProductDetail";

import HamProvider from "./components/providers/HamProvider";

import { userLoginState } from "./redux/userLoginSlice";
import { getUser } from "./redux/getUserSlice";
import LoginRequired from "./utils/LoginRequired";
import ErrorScreen from "./components/ErrorScreen";

function App() {
  const { user } = useSelector(userLoginState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.access) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  return (
    <Router>
      <HamProvider>
        <Routes>
          <Route path="*" element={<ErrorScreen />} />
          <Route path="/" index element={<LoginScreen />} />

          <Route path="/login" element={<LoginScreen />} />

          <Route path="/register" element={<RegisterScreen />} />

          <Route
            path="/dashboard"
            element={
              <LoginRequired>
                {" "}
                <Dashboard />{" "}
              </LoginRequired>
            }
          />
          <Route
            path="/categories/sneakers"
            element={
              <LoginRequired>
                <Sneakers />
              </LoginRequired>
            }
          />
          <Route
            path="/categories/foodstuffs"
            element={
              <LoginRequired>
                <FoodStuffs />
              </LoginRequired>
            }
          />
          <Route
            path="/categories/groceries"
            element={
              <LoginRequired>
                <Groceries />
              </LoginRequired>
            }
          />

          <Route
            path="/product/:productId"
            element={
              <LoginRequired>
                <ProductDetail />
              </LoginRequired>
            }
          />

          <Route
            path="/cart"
            element={
              <LoginRequired>
                <Cart />
              </LoginRequired>
            }
          />

          <Route
            path="/profile"
            element={
              <LoginRequired>
                <Profile />
              </LoginRequired>
            }
          />
        </Routes>
      </HamProvider>

      <ToastContainer />
    </Router>
  );
}

export default App;
