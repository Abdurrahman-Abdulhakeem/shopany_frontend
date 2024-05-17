import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerState, registerUser } from "../redux/registerSlice";
import MiniSpinner from "../components/MiniSpinner";

function RegisterScreen() {
  const {loading} = useSelector(registerState)
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => ({
      ...prev,
      password: !prev.password,
    }));
  };

  const handlesShowConfirmPassword = () => {
    setShowPassword((prev) => ({
      ...prev,
      confirmPassword: !prev.confirmPassword,
    }));
  };

  const validationSchema = yup.object().shape({
    Fname: yup.string().required("First Name is required"),
    Lname: yup.string().required("Last Name is required"),
    Email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    PhoneNumber: yup
      .number()
      .typeError("Invalid phone number")
      .required("Phone number is required"),
    Password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long"
      ),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Password does not match")
      .required("Password confirm is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const dispatch = useDispatch()

  const onSubmit = (data) => {

    dispatch(registerUser(data)).then(() => reset())
    
  };

  return (
    <div className="register-container">
      <form className="register card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup for Shopany</h2>
        <div>
          <input
            type="text"
            name="fname"
            {...register("Fname")}
            placeholder="First Name"
            className={errors.Fname ? "error-input" : ""}
          />
          <ErrorMessage
            errors={errors}
            name="Fname"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <input
            type="text"
            name="lname"
            {...register("Lname")}
            placeholder="Last Name"
            className={errors.Lname ? "error-input" : ""}
          />
          <ErrorMessage
            errors={errors}
            name="Lname"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            {...register("Email")}
            placeholder="Email address"
            className={errors.Email ? "error-input" : ""}
          />
          <ErrorMessage
            errors={errors}
            name="Email"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            {...register("PhoneNumber")}
            className={errors.PhoneNumber ? "error-input" : ""}
          />
          <ErrorMessage
            errors={errors}
            name="PhoneNumber"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <span className="flex pass-eye-container">
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...register("Password")}
              className={errors.Password ? "error-input" : ""}
            />
            <span className="eye-icon" onClick={handleShowPassword}>
              {" "}
              {showPassword.password ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </span>
          </span>

          <ErrorMessage
            errors={errors}
            name="Password"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <span className="flex pass-eye-container">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("ConfirmPassword")}
              className={errors.ConfirmPassword ? "error-input" : ""}
            />
            <span className="eye-icon" onClick={handlesShowConfirmPassword}>
              {showPassword.confirmPassword ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </span>
          </span>
          <ErrorMessage
            errors={errors}
            name="ConfirmPassword"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>

        <button type="submit" className="btn full" disabled={loading}>
          {loading ? <MiniSpinner /> : "Sign Up"}
        </button>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ marginLeft: "10px", color: "rgb(123, 104, 238)" }}
          >
            Login
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

export default RegisterScreen;
