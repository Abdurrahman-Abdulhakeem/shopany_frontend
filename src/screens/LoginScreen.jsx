import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userLoginState } from "../redux/userLoginSlice";
import MiniSpinner from "../components/MiniSpinner";

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector(userLoginState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data)).then(() => reset());
    
  };

  useEffect(() => {
    if (user?.access) {
      navigate("/dashboard");
    }
  }, [user, navigate, dispatch]);

  return (
    <div class="register-container">
      <form class="register card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login to your Shopany account</h2>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            {...register("email", { required: "Email is required!" })}
            className={errors.email ? "error-input" : ""}
          />

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <span className="flex pass-eye-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={errors.password ? "error-input" : ""}
            />

            <span className="eye-icon" onClick={handleShowPassword}>
              {" "}
              {showPassword ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </span>
          </span>

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>

        <button type="submit" className="btn full" disabled={loading}>
          {loading ? <MiniSpinner /> : "Login"}
        </button>

        <p>
          Don't have an account yet?{" "}
          <Link
            to="/register"
            style={{ marginLeft: "10px", color: "rgb(123, 104, 238)" }}
          >
            Sign up
          </Link>
        </p>
      </form>

      <p style={{ fontSize: "1.3em", color: "#fff" }}>
        {" "}
        &copy; Shopany {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default LoginScreen;
