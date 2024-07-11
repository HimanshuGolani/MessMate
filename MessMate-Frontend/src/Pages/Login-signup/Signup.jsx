import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone_no: "",
    businessName: "",
    Gst_No: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <div className="container">
      <div className="form-wrapper">
        {currentStep === 0 && (
          <div>
            <h2 className="step-header">Step 1: Account Details</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="button-group">
              <button onClick={nextStep} className="button button-next">
                Next
              </button>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div>
            <h2 className="step-header">Step 2: Contact Details</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="phone_no">
                Phone Number
              </label>
              <input
                id="phone_no"
                name="phone_no"
                type="text"
                value={formData.phone_no}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="button button-back">
                Back
              </button>
              <button onClick={nextStep} className="button button-next">
                Next
              </button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="step-header">Step 3: Business Details</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="businessName">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="Gst_No">
                GST Number
              </label>
              <input
                id="Gst_No"
                name="Gst_No"
                type="text"
                value={formData.Gst_No}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="button button-back">
                Back
              </button>
              <button className="button button-submit">Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
