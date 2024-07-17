import React, { useState } from "react";
import axios from "axios";
import "./Login-signup.css";
import { useAppState } from "../../Context/AppState";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const {
    BASE_URL,
    setUserId,
    setUserName,
    setIsAuth,
    setRole,
    setVendorId,
    setCustomerId,
  } = useAppState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginType, setLoginType] = useState("Customer");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginTypeChange = (e) => {
    e.preventDefault();
    setLoginType(e.target.value);
  };

  const loginRequest = async () => {
    try {
      const REQUEST_URL =
        loginType === "Customer"
          ? `${BASE_URL}/user/login`
          : `${BASE_URL}/vender/loginVendor`;

      const response = await axios.post(REQUEST_URL, {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Login successful!");

      const { user } = response.data;

      localStorage.setItem(`role`, loginType);

      if (loginType === "Vendor") {
        const { vendorId } = response.data;
        localStorage.setItem("vendorId", vendorId);
        setVendorId(vendorId);
      }

      console.log("====================================");
      console.log("The user data is : ", response.data);
      console.log("====================================");

      const { role } = response.data;

      if (role === "Customer") {
        const { CustomerId } = response.data;
        localStorage.setItem("customerId", CustomerId);
        setCustomerId(CustomerId);
      }

      setRole(loginType);
      setUserId(user._id);
      setUserName(user.name);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginRequest();
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-header">
        <h2>Login Form</h2>
      </div>

      <div className="login-type-choice-input">
        <label className="form-label">Login as a?</label>
        <select
          className="section"
          id="loginType"
          name="loginType"
          value={loginType}
          onChange={handleLoginTypeChange}
        >
          <option className="type-options" value="Customer">
            Customer
          </option>
          <option className="type-options" value="Vendor">
            Vendor
          </option>
        </select>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">Enter Your Email</label>
        <input
          className="input-txt"
          type="email"
          id="email"
          name="email"
          placeholder="Your email.."
          onChange={handleInputChange}
        />

        <label className="form-label">Enter Your Password</label>
        <input
          className="input-txt"
          type="password"
          id="password"
          name="password"
          placeholder="Enter Your password.."
          onChange={handleInputChange}
        />

        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
