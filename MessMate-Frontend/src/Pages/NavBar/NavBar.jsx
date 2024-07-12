import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    removeCookies("user");
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#f0a15b", padding: "0 1rem" }}
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
          <div className="desktop-menu">
            {cookies.user ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
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
            {cookies.user ? (
              <>
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/AllVendors"
                  onClick={handleMenuClose}
                >
                  All Vendors
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/signup"
                  onClick={handleMenuClose}
                >
                  Sign-up
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/AllVendors"
                  onClick={handleMenuClose}
                >
                  All Vendors
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
