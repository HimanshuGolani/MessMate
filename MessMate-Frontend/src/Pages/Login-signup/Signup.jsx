import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRole] = useState("");
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone_no: "",
  });

  const [vendorForm, setVendorForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    phone_no:"",
    Gst_No: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (role === "Customer") {
      setCustomerForm((prevData) => ({ ...prevData, [name]: value }));
    } else if (role === "Vendor") {
      setVendorForm((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <div className="container">
      <div className="form-wrapper">
        {currentStep === 0 && (
          <div>
            <h2 className="step-header">Step 1: Choose Your Role</h2>
            <div className="input-field">
              <label className="input-label role-input" htmlFor="role">
                Choose a role
              </label>
              <select
              className="role-select"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Select a role</option>
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            {role.length > 0 ? (
              <>
                <div className="button-group">
                  <button onClick={nextStep} className="button button-next">
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  please select a role
                </p>
              </>
            )}
          </div>
        )}
        {currentStep === 1 && role === "Customer" && (
          <div>
            <h2 className="step-header">Step 2: Account Details</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={customerForm.name}
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
                value={customerForm.email}
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
                value={customerForm.password}
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
        
        {currentStep === 1 && role === "Vendor" && (
          <div>
            <h2 className="step-header">Step 2: Business Details</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="name">
                Owner Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={vendorForm.name}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="businessName">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={vendorForm.businessName}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="businessName">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={vendorForm.email}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="businessName">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={vendorForm.password}
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
                value={vendorForm.phone_no}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="additionalDetails">
                Loaction
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={vendorForm.additionalDetails}
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
                value={vendorForm.Gst_No}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="button button-back">
                Back
              </button>
              <button  className="button button-next">
                Submit
              </button>
            </div>
          </div>
        )}
        {currentStep === 2 && role === "Customer" && (
          <div>
            <h2 className="step-header">Step 3: Contact Details</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={customerForm.address}
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
                value={customerForm.phone_no}
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
