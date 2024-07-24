import { Button } from "@mui/material";
import "./VendorProfile.css";
import EditIcon from "@mui/icons-material/Edit";

const VendorProfile = () => {
  const handleEdit = async () => {};
  return (
    <div>
      <div className="profile-container">
        <header className="header">
          <div className="heading">
            <h1>Vendor Profile</h1>
            <Button onClick={handleEdit}>
              <EditIcon
                sx={{
                  color: " rgb(207, 126, 27)",
                }}
              />
            </Button>
          </div>
        </header>
        <main>
          <div className="vendor-content"></div>
        </main>
      </div>
    </div>
  );
};

export default VendorProfile;
