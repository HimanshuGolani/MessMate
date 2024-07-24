import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../Context/AppState";
import "./VendorProfile.css";

const VendorProfile = () => {
  const { BASE_URL, vendorId } = useAppState();
  const [vendorData, setVendorData] = useState({
    businessAddress: "",
    businessName: "",
    businessPhone: "",
    plansOffered: "",
    noOfCustomers: "",
    imageOfMess: "",
    Gst_No: "",
  });
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit-vendor-profile", { state: { vendorData } });
  };

  const getVendorProfile = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/vender/getProfileDetails/${vendorId}`
      );
      setVendorData(response.data);
    } catch (error) {
      console.error("Error fetching vendor profile:", error);
    }
  };

  useEffect(() => {
    getVendorProfile();
  }, []);

  return (
    <div className="profile-container">
      <header className="header">
        <div className="heading">
          <h1>Vendor Profile</h1>
          <Button onClick={handleEdit}>
            <EditIcon
              sx={{
                color: "rgb(207, 126, 27)",
              }}
            />
          </Button>
        </div>
      </header>
      <main>
        <div className="vendor-content">
          <ol>
            <li>
              <strong>Name of the Vendor:</strong> {vendorData.businessName}
            </li>
            <li>
              <strong>Number of Customers:</strong> {vendorData.noOfCustomers}
            </li>
            <li>
              <strong>Number of Plans Offered:</strong>{" "}
              {vendorData.plansOffered}
            </li>
            <li>
              <strong>Phone Number:</strong> {vendorData.businessPhone}
            </li>
            <li>
              <strong>Address of the Mess:</strong>{" "}
              {vendorData.businessAddress.location}
            </li>
            <li>
              <strong>Image of the Mess:</strong>{" "}
              <img
                src={vendorData.imageOfMess}
                alt="Mess"
                className="mess-image"
              />
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default VendorProfile;
