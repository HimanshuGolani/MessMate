import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import "./NavBar.css";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const settings = ["Profile", "Dashboard", "Logout"];

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            MessMate
          </Link>
          <button className="navbar-toggle" onClick={handleNavToggle}>
            <MenuIcon />
          </button>
        </div>
        <nav className={`navbar-menu ${isNavOpen ? "open" : ""}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/current-plans" className="nav-link">
                Current Plans
              </Link>
            </li>
          </ul>
        </nav>
        <div className="navbar-user">
          <button className="user-menu-toggle" onClick={handleUserMenuToggle}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
          </button>
          <div className={`user-menu ${isUserMenuOpen ? "open" : ""}`}>
            {settings.map((setting) => (
              <Link
                to={`/${setting.toLowerCase()}`}
                className="user-menu-item"
                key={setting}
              >
                {setting}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
