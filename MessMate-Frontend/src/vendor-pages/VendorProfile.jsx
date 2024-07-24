import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./VendorProfile.css";

const VendorProfile = ({ vendorData }) => {
  const handleEdit = async () => {
    // Edit functionality
  };

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
              <strong>Name of the Vendor:</strong> {"name"}
            </li>
            <li>
              <strong>Number of Customers:</strong> {"customers"}
            </li>
            <li>
              <strong>Number of Plans Offered:</strong> {"plans"}
            </li>

            <li>
              <strong>Phone Number:</strong> {"phone"}
            </li>
            <li>
              <strong>Address of the Mess:</strong> {"address"}
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default VendorProfile;
