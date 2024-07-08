import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [cookies, setCookies] = useCookies(["user"]);

  return (
    <header className="header">
      <div className="logo">
        <h1 className="heading-primary">Mess-Mate</h1>
      </div>
      <nav className="main-nav">
        {cookies.user ? (
          <>Logout Button</>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
