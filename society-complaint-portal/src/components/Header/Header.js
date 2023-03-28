import React from "react";
import "./Header.css";
import logo from "./SCP3.png";
import { Link } from "react-router-dom";
// import ScreenBtn from "../Button/ScreenButton";

// import FrontPage from "./FrontPage";
// import Login from "./Login";

const Header = ({ goAbout }) => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="linkStyle">
              Home
            </Link>
          </li>
          <li>
            <span onClick={() => goAbout("about")} className="linkStyle">
              About
            </span>
          </li>
          <li>
            <span onClick={() => goAbout("service")} className="linkStyle">
              Services
            </span>
          </li>
          <li>
            <Link to="/login" className="linkstyle">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
