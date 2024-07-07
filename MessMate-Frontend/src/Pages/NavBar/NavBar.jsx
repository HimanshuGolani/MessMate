import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <h1 className="heading-primary">Mess-Mate</h1>
        </div>
        <nav className="main-nav">Navigation</nav>
      </header>
    </>
  );
};

export default NavBar;
