import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScreenBtn from "../components/Button/ScreenButton";
import "./addAdmin.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";

const AddAdmin = () => {
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/super-adminfp");
  };

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);

  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  function nameHandler(event) {
    //name handler
    setUserInputs({
      ...userInputs,
      name: event.target.value,
    });
  }
  function emailHandler(event) {
    setUserInputs({
      ...userInputs,
      email: event.target.value,
    });
  }
  function phoneHandler(event) {
    setUserInputs({
      ...userInputs,
      phone: event.target.value,
    });
  }
  function passwordHandler(event) {
    setUserInputs({
      ...userInputs,
      password: event.target.value,
    });
  }

  function submitHandler(event) {
    event.preventDefault();

    if (nameRef.current.value.trim() === "") {
      alert("please fill the name field ");
      return false;
    } else if (phoneRef.current.value.length < 11) {
      alert("length must be atleast of 11 characters");
      return false;
    } else if (passwordRef.current.value.length < 8) {
      alert("length must be atleast of 8 characters");
      return false;
    }

    console.log(userInputs);
    setUserInputs({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  }

  return (
    <div className="SA-addAdmin-container-div">
      <form className="SA-addAdmin-form" onSubmit={submitHandler}>
        <img className="SA-Addadmin-loginIcon" src={loginIcon} alt="SCP pic" />
        <h2 className="SA-Addadmin-login-txt"> Add New Admin</h2>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
            icon={faPerson}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Enter Valid Name"
            type="text"
            name="adminName"
            ref={nameRef}
            value={userInputs.name}
            onChange={nameHandler}
            autoFocus
          />
        </div>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
            icon={faEnvelope}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Enter Valid Email"
            type="email"
            name="adminEmail"
            value={userInputs.email}
            onChange={emailHandler}
          />
        </div>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
            icon={faMobile}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Enter Valid Phone-Number"
            type="number"
            ref={phoneRef}
            name="adminPhone"
            value={userInputs.phone}
            onChange={phoneHandler}
          />
        </div>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
            icon={faLock}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Enter Valid Password"
            type="password"
            ref={passwordRef}
            name="adminPassword"
            value={userInputs.password}
            onChange={passwordHandler}
          />
        </div>
        <div className="SA-Addadmin-singleButton-container">
          <ScreenBtn type="submit">Add Admin</ScreenBtn>
          <ScreenBtn type="button" onClick={sAdminHomePage}>
            Go Back
          </ScreenBtn>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
