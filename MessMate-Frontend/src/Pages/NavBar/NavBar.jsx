import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import your CSS file
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookies("user");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1 className="heading-primary">Mess-Mate</h1>
      </div>
      <nav className="main-nav">
        <ul className="main-nav-list">
          {cookies.user ? (
            <>
              <li>
                <Link className="main-nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/searchVendors">
                  Search Vendors near you
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <button className="btn btn--logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="main-nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/signup">
                  Sign-up
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/searchVendors">
                  Search Vendors near you
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
