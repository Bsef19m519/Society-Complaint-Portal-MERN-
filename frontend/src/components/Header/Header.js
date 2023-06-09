import React from "react";
// import { Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import logo from "./SCP3.png";
import { Link } from "react-router-dom";
import ScreenBtn from "../Button/ScreenButton";
import { useNavigate } from "react-router-dom";

// import ScreenBtn from "../Button/ScreenButton";

// import FrontPage from "./FrontPage";
// import Login from "./Login";

const Header = (props) => {
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    props.setLogIn(false);
    navigate("/login");
  }

  if (props.login === false) {
    return (
      <header>
        <nav>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul>
            <li>
              <Link to="/" className="linkStyle">
                Home
              </Link>
            </li>
            <li>
              {/* <span onClick={() => goAbout("about")} className="linkStyle">
              About
            </span> */}
              <Link to="/about" className="linkStyle">
                About
              </Link>
            </li>
            <li>
              {/* <span onClick={() => goAbout("service")} className="linkStyle">
              Services
            </span> */}
              <Link to="/service" className="linkStyle">
                Service
              </Link>
            </li>
            <li>
              <Link to="/login" className="linkstyle">
                Login
              </Link>
            </li>
            {/* {props.login ? (
            <li>
              <ScreenBtn>Logout</ScreenBtn>
            </li>
          ) : (
            <li>
              <Link to="/login" className="linkstyle">
                Login
              </Link>
            </li>
          )} */}
          </ul>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <nav>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul>
            {/* <li>
              <Link to="/" className="linkStyle">
                Home
              </Link>
            </li>
            <li>
              {/* <span onClick={() => goAbout("about")} className="linkStyle">
              About
            </span> */}
            {/* <Link to="/about" className="linkStyle">
                About
              </Link>
            </li> */}
            {/* <li>
              {/* <span onClick={() => goAbout("service")} className="linkStyle">
              Services
            </span> */}
            {/* <Link to="/service" className="linkStyle">
                Service
              </Link>
            </ul></li> */}{" "}
            <li>
              <ScreenBtn onClick={logOut}>Logout</ScreenBtn>
            </li>
            {/* {props.login ? (
            <li>
              <ScreenBtn>Logout</ScreenBtn>
            </li>
          ) : (
            <li>
              <Link to="/login" className="linkstyle">
                Login
              </Link>
            </li>
          )} */}
          </ul>
        </nav>
      </header>
    );
  }
};

export default Header;
