import React, { useState, useRef } from "react";
import ScreenBtn from "../Button/ScreenButton";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import loginIcon from "../Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  //creating ref to manage dom
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  //creating and managing state of inputs

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //create nagation of nex components
  let navigate = useNavigate();
  // let navigate1 = useNavigate();

  const nextPage = () => {
    navigate("/front-page");
  };

  const SAnextPage = () => {
    navigate("/super-adminfp");
  };

  //store inputs in object
  const userInputs = {
    EmailInput: email,
    PasswordInput: password,
  };

  //create onsubmit handler function
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    //email validation
    if (emailRef.current.value.trim() === "") {
      alert("empty email field");
      return false;
    }

    //password length validation
    else if (passwordRef.current.value.trim().length < 8) {
      alert("invalid password length");
      return false;
    }

    console.log(userInputs); //for testing purpose
    nextPage();
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
          <div className="loginDiv">
            <ScreenBtn type="submit">Sign In</ScreenBtn>
            <ScreenBtn type="button" onClick={SAnextPage}>
              Super Admin
            </ScreenBtn>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
