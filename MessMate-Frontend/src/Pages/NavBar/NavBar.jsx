import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAppState } from "../../Context/AppState";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const {
    isAuth,
    setIsAuth,
    role,
    setUserId,
    setUserName,
    setRole,
    setVendorId,
    setCustomerId,
  } = useAppState();
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  console.log("The role is: ", role);

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    localStorage.removeItem("vendorId");
    localStorage.removeItem("customerId");
    setUserId("");
    setUserName("");
    setRole("");
    setVendorId("");
    setCustomerId("");
    handleMenuClose();
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderLinks = () => {
    if (!isAuth) {
      return (
        <div>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Sign-up
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/AllVendors"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            All Vendors
          </Button>
        </div>
      );
    }

    if (role === "Customer") {
      return (
        <div>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/AllVendors"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            All Vendors
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/OngoingPlan"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Ongoing Plan
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Logout
          </Button>
        </div>
      );
    }

    if (role === "Vendor") {
      return (
        <div>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/vender/addPlan"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Add Plans
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/vender/myPlans"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            My Plans
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/todays-cancellations"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Today's Cancellations
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/vender/myCustomersList"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Customer's List
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontSize: "1.4rem",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Logout
          </Button>
        </div>
      );
    }

    return null;
  };

  const renderMenuItems = () => {
    if (!isAuth) {
      return (
        <div>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            Home
          </MenuItem>
          <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
            Login
          </MenuItem>
          <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
            Sign-up
          </MenuItem>
          <MenuItem component={Link} to="/AllVendors" onClick={handleMenuClose}>
            All Vendors
          </MenuItem>
        </div>
      );
    }

    if (role === "Customer") {
      return (
        <div>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            Home
          </MenuItem>
          <MenuItem component={Link} to="/AllVendors" onClick={handleMenuClose}>
            All Vendors
          </MenuItem>
          <MenuItem
            component={Link}
            to="/OngoingPlan"
            onClick={handleMenuClose}
          >
            Ongoing Plan
          </MenuItem>
          <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      );
    }

    if (role === "Vendor") {
      return (
        <div>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            Home
          </MenuItem>
          <MenuItem
            component={Link}
            to="/vender/addPlan"
            onClick={handleMenuClose}
          >
            Add Plans
          </MenuItem>
          <MenuItem
            component={Link}
            to="/vender/myPlans"
            onClick={handleMenuClose}
          >
            My Plans
          </MenuItem>
          <MenuItem
            component={Link}
            to="/todays-cancellations"
            onClick={handleMenuClose}
          >
            Today's Cancellations
          </MenuItem>
          <MenuItem
            component={Link}
            to="/vender/myCustomersList"
            onClick={handleMenuClose}
          >
            Customer's List
          </MenuItem>
          <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      );
    }

    return null;
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#F4A261", padding: "0 1rem" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: "2.8rem" }}
        >
          Mess-Mate
        </Typography>
        <div className="nav-links">
          {/* Desktop Menu */}
          <div className="desktop-menu">{renderLinks()}</div>
          {/* Hamburger Menu */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {renderMenuItems()}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
