import React, { useState } from "react";
import "./signup.css";
import { useAppState } from "../../Context/AppState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../Firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function Signup() {
  const { BASE_URL, setUserId, setUserName, setIsAuth, setRole } =
    useAppState();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRoleS] = useState("");
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    password: "",
    address: {
      city: "",
      location: "",
    },
    phone_no: "",
  });

  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [vendorForm, setVendorForm] = useState({
    name: "",
    email: "",
    password: "",
    address: {
      city: "",
      location: "",
    },
    businessName: "",
    phone_no: "",
    Gst_No: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      if (role === "Customer") {
        setCustomerForm((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            [addressField]: value,
          },
        }));
      } else if (role === "Vendor") {
        setVendorForm((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            [addressField]: value,
          },
        }));
      }
    } else {
      if (role === "Customer") {
        setCustomerForm((prevData) => ({ ...prevData, [name]: value }));
      } else if (role === "Vendor") {
        setVendorForm((prevData) => ({ ...prevData, [name]: value }));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `vendor_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          toast.error("Failed to upload image.");
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            setLoading(false);
            toast.success("Image uploaded successfully!");
          });
        }
      );
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    if (loading) {
      toast.info("Please wait for the image to finish uploading.");
      return;
    }
    try {
      if (role === "Customer") {
        const response = await axios.post(`${BASE_URL}/user/createUser`, {
          name: customerForm.name,
          email: customerForm.email,
          password: customerForm.password,
          address: customerForm.address,
          phone_no: customerForm.phone_no,
          role: role,
        });
        toast.success("Customer created successfully!");
        const { userID, fullName } = response.data.Customer;
        setUserId(userID);
        setUserName(fullName);
        localStorage.setItem("role", response.data.role);
        setRole(role);
        setIsAuth(true);
        navigate("/");
      } else if (role === "Vendor") {
        const response = await axios.post(`${BASE_URL}/vender/createVendor`, {
          name: vendorForm.name,
          email: vendorForm.email,
          password: vendorForm.password,
          address: vendorForm.address,
          phone_no: vendorForm.phone_no,
          businessName: vendorForm.businessName,
          Gst_No: vendorForm.Gst_No,
          imageOfMess: imgUrl,
        });
        toast.success("Vendor created successfully!");
        const { userID, businessName } = response.data.Vendor;
        setUserId(userID);
        setUserName(businessName);
        localStorage.setItem("role", response.data.role);
        setIsAuth(true);
        setRole(role);
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
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
                onChange={(e) => setRoleS(e.target.value)}
              >
                <option>Select a role</option>
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            {role.length > 0 ? (
              <div className="button-group">
                <button onClick={nextStep} className="button button-next">
                  Next
                </button>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Please select a role
              </p>
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
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={vendorForm.email}
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
                value={vendorForm.password}
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

            <div className="input-field">
              <label className="input-label" htmlFor="imageOfMess">
                Upload an Image of Your Business
              </label>
              <input
                id="imageOfMess"
                name="imageOfMess"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-box"
              />
              {loading && <p>Uploading image...</p>}
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
            <h2 className="step-header">Step 3: Contact Information</h2>
            <div className="input-field">
              <label className="input-label" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="address.city"
                type="text"
                value={
                  role === "Customer"
                    ? customerForm.address.city
                    : vendorForm.address.city
                }
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="input-field">
              <label className="input-label" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="address.location"
                type="text"
                value={
                  role === "Customer"
                    ? customerForm.address.location
                    : vendorForm.address.location
                }
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
                value={
                  role === "Customer"
                    ? customerForm.phone_no
                    : vendorForm.phone_no
                }
                onChange={handleChange}
                className="input-box"
              />
            </div>

            <div className="button-group">
              <button onClick={prevStep} className="button button-back">
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="button button-submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
