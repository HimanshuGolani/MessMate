import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useAppState } from "../Context/AppState";
import { storage } from "../Firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
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
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `mess_images/${file.name}`);
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
          console.error(error);
          toast.error("Failed to upload image.");
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prevState) => ({
              ...prevState,
              imageOfMess: downloadURL,
            }));
            setLoading(false);
            toast.success("Image uploaded successfully!");
          });
        }
      );
    }
  };

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
        `${BASE_URL}/vender/updateVendorDetails/${vendorId}`,
        formData
      );
      toast.success("Profile updated successfully!");
      navigate("/vender/vendorProfile");
    } catch (error) {
      console.error("Error updating vendor profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <h1>Edit Vendor Profile</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Business Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="businessPhone"
          value={formData.businessPhone}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="GST Number"
          name="Gst_No"
          value={formData.Gst_No}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.businessAddress.city}
          onChange={handleAddressChange}
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={formData.businessAddress.location}
          onChange={handleAddressChange}
          margin="normal"
        />
        <input
          type="file"
          name="imageOfMess"
          accept="image/*"
          onChange={handleImageChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditVendorProfile;
