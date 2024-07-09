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
      {" "}
      {/* Apply header class */}
      <div className="logo">
        <h1 className="heading-primary">Mess-Mate</h1>
      </div>
      <nav className="main-nav">
        {" "}
        {/* Apply main-nav class */}
        <ul className="main-nav-list">
          {" "}
          {/* Apply main-nav-list class */}
          {cookies.user ? (
            <>
              <li>
                <Link className="main-nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/">
                  Search Vendors near you
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/">
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
                <Link className="main-nav-link" to="/login">
                  Sign-up
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/">
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
