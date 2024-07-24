import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useAppState } from "../Context/AppState";
import "./EditVendorProfile.css";

const EditVendorProfile = () => {
  const { BASE_URL, vendorId } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();
  const { vendorData } = location.state;

  const [formData, setFormData] = useState({
    businessName: vendorData.businessName,
    businessPhone: vendorData.businessPhone,
    Gst_No: vendorData.Gst_No,
    imageOfMess: vendorData.imageOfMess,
    businessAddress: {
      city: vendorData.businessAddress.city,
      location: vendorData.businessAddress.location,
    },
  });

  const handelImageChange = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      businessAddress: {
        ...prevState.businessAddress,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/vender/editVendorDetails/${vendorId}`,
        formData
      );
      console.log(response.data.message);
      navigate("/vendor-profile");
    } catch (error) {
      console.error("Error updating vendor profile:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Vendor Profile</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Business Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="businessPhone"
          value={formData.businessPhone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="GST Number"
          name="Gst_No"
          value={formData.Gst_No}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.businessAddress.city}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={formData.businessAddress.location}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="file"
          name="imageOfMess"
          value={formData.imageOfMess}
          onChange={handelImageChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditVendorProfile;
