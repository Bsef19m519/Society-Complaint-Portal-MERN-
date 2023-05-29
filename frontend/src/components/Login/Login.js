import React, { useState, useRef } from "react";
import ScreenBtn from "../Button/ScreenButton";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import loginIcon from "../Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import jwt from "jwt-decode";

const Login = () => {
  //creating ref to manage dom
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  //creating and managing state of inputs

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //create nagation of nex components
  let navigate = useNavigate();
  // let navigate1 = useNavigate();

  const nextPageResident = () => {
    navigate("/Resident-front-page");
  };
  const nextPageAdmin = () => {
    navigate("/Admin-front-page");
  };

  //store inputs in object
  const userInputs = {
    email: email,
    password: password,
  };

  //create onsubmit handler function
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    //email validation
    if (emailRef.current.value.trim() === "") {
      // alert("empty email field");
      setMessage("Error: Empty Email Field");
      return false;
    }

    //password length validation
    else if (passwordRef.current.value.trim().length < 8) {
      // alert("invalid password length");
      setMessage("Error: Empty Password Field");
      return false;
    }

    //fetch call
    fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputs),
    })
      .then((response) => {
        //console.log(response);
        if (!response.ok) {
          setMessage("Error: Wrong Credentials.");
        } else {
          setMessage("");
        }
        const data = response.json();
        data
          .then((tokenObj) => {
            const token = tokenObj.token;

            //console.log(token); for testing purpose
            // Store the token in localStorage
            localStorage.setItem("token", token);

            // Decode the token
            const decodedToken = jwt(token);
            // console.log(decodedToken);
            if (decodedToken.role === "admin") {
              nextPageAdmin();
            } else if (decodedToken.role === "resident") {
              nextPageResident();
            } else if (decodedToken.role === "complaintOfficer") {
              nextPageResident();
            } else {
            }
            // console.log("Decoded Token:", decodedToken);
            // console.log(decodedToken.role);
          })
          .catch((error) => console.error(error));

        // return decodedToken;
      })

      //.then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="form-container">
        <form className="loginForm" onSubmit={handleSubmit}>
          <img className="loginIcon" src={loginIcon} alt="SCP pic" />
          <h2 className="login-txt"> Log In</h2>
          <div className="loginDiv">
            <FontAwesomeIcon
              className="login-faicons"
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <br />
            <input
              type="email"
              placeholder="Enter Valid Email"
              name="uname"
              ref={emailRef}
              value={email}
              onChange={emailHandler}
            />
            <hr />
          </div>

          <div className="loginDiv">
            <FontAwesomeIcon
              className="login-faicons"
              icon={faLock}
            ></FontAwesomeIcon>
            <input
              type="password"
              placeholder="Enter Valid Password"
              name="pass"
              ref={passwordRef}
              value={password}
              onChange={passwordHandler}
            />
            <hr />
          </div>
          <div className="loginDiv-Button">
            <ScreenBtn type="submit">Sign In</ScreenBtn>
            {/* <ScreenBtn type="button" onClick={SAnextPage}>
              SA
            </ScreenBtn> */}
          </div>
          <div className="superAdmin-Add-message">
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
