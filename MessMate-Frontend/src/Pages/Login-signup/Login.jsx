import React, { useState } from "react";
import axios from "axios";
import "./Login-signup.css";
import { useAppState } from "../../Context/AppState";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const { setUserId, setUserName } = useAppState();
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["user"]);

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
    const REQUEST_URL =
      loginType === "Customer"
        ? `http://localhost:8080/api/v1/user/login`
        : `http://localhost:8080/api/v1/vender/loginVendor`;
    const response = await axios.post(REQUEST_URL, {
      email: formData.email,
      password: formData.password,
    });

    setCookies("user", response.data.token);

    const { user } = response.data;

    setUserId(user._id);
    setUserName(user.name);
    console.log("The cookie is : ", cookies.user);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await loginRequest();
    navigate("/");
  };

  return (
    <div className="login-container">
      {/* Heading of the page */}
      <div className="login-header">
        <h2>Login Form</h2>
      </div>

      {/* Login type choice option */}
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

      <form className="form" onSubmit={handelSubmit}>
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
