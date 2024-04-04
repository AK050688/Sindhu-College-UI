// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home/Navbar.css";
import logoImage from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbarContainer ${menuOpen ? "menu-open" : ""}`}>
      <div className="logo" onClick={() => (window.location.href = "/")}>
        <img src={logoImage} alt="Logo" />
        <span className="website-name">
          <Link to="/" style={{ textDecoration: "none", fontSize: "16px" }}>
            SINDHU COLLEGE OF EDUCATION
          </Link>
        </span>
      </div>
      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about-us">About Us</a>
        </li>
        <li>
          <a href="/admission">Admission</a>
        </li>
        <li>
          <a href="/faculty">Faculty</a>
        </li>
        <li>
          <a href="/our-campus">Our Campus</a>
        </li>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
