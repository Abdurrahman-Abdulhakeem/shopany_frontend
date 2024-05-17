import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";

import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";

import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  getUserState,
  uploadImage,
} from "../redux/getUserSlice";
import { BASEURL } from "../utils/useAxios";
import Loader from "../components/Loader";

function Profile() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);

    dispatch(uploadImage(file));
  };

  const { loading, userData } = useSelector(getUserState);

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

  const setPasswordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long"
      ),
    confirmNewPassword: yup
      .string()
      .required("Confirm New Password")
      .oneOf([yup.ref("newPassword"), null], "Password does not match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setPasswordSchema),
  });

  const submitHandler = (data) => {
    dispatch(changePassword(data));
    reset();
  };

  return (
    <Base>
      <main className="dashboard">
        <Hamburger />
        {loading && <Loader />}
        <div className="profile">
          <div className="profile-bg">
            <img src={BASEURL + userData?.image} alt="profile-bg" />
            <div>
              <input
                type="file"
                hidden
                id="profile-pic"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <label for="profile-pic" className="btn">
                Update Image
              </label>
            </div>
          </div>
          <div className="profile-details">
            <p className="view">{userData?.first_name}</p>
            <p className="view">{userData?.last_name}</p>
          </div>
          <div className="profile-details">
            <p className="view">{userData?.email}</p>
            <p className="view">{userData?.phone_number}</p>
          </div>

          <form
            className="password-section"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h2>Change Password</h2>
            <div>
              <span className="flex pass-eye-container">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="New password"
                  {...register("newPassword")}
                  className={errors.newPassword ? "error-input" : ""}
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
                name="newPassword"
                render={({ message }) => (
                  <span className="error-msg">{message}</span>
                )}
              />
            </div>
            <div>
              <span className="flex pass-eye-container">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Confirm new password"
                  {...register("confirmNewPassword")}
                  className={errors.confirmNewPassword ? "error-input" : ""}
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
                name="confirmNewPassword"
                render={({ message }) => (
                  <span className="error-msg">{message}</span>
                )}
              />
            </div>
            <input type="submit" value="Change Password" className="btn" />
          </form>
        </div>
      </main>
    </Base>
  );
}

export default Profile;
