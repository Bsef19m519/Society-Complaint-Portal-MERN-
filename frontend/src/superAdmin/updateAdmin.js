import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScreenBtn from "../components/Button/ScreenButton";
import "./UpdateAdmin.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const UpdateAdmin = () => {
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/super-adminfp");
  };

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const IdRef = useRef(null);
  const cnicRef = useRef(null);
  const addressRef = useRef(null);
  const cnfrmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ID: "",
    CNIC: "",
    address: "",
  });
  const [cPassword, setCpassword] = useState("");

  function nameHandler(event) {
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
  function IDHandler(event) {
    setUserInputs({
      ...userInputs,
      ID: event.target.value,
    });
  }
  function CnicHandler(event) {
    setUserInputs({
      ...userInputs,
      CNIC: event.target.value,
    });
  }
  function addressHandler(event) {
    setUserInputs({
      ...userInputs,
      address: event.target.value,
    });
  }
  function cPasswordHandler(event) {
    setCpassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    if (nameRef.current.value.trim() === "") {
      alert("please fill the name field ");
      return false;
    } else if (emailRef.current.value.trim() === "") {
      alert("email can not be empty");
      return false;
    } else if (
      cnicRef.current.value.trim() === "" ||
      cnicRef.current.value.length < 15
    ) {
      alert(
        "CNIC can not be empty and must be of 15 length including special characters"
      );
      return false;
    } else if (addressRef.current.value.trim() === "") {
      alert("address field can not be empty");
      return false;
    } else if (phoneRef.current.value.length < 11) {
      alert("length must be atleast of 11 characters");
      return false;
    } else if (passwordRef.current.value.trim() === "") {
      alert("password field can not be empty");
      return false;
    } else if (passwordRef.current.value.length < 8) {
      alert("length must be atleast of 8 characters");
      return false;
    } else if (passwordRef.current.value !== cnfrmPasswordRef.current.value) {
      alert("password and confirm password must be same");
      return false;
    }

    console.log(userInputs);
    console.log(cPassword);
    setUserInputs({
      name: "",
      email: "",
      phone: "",
      password: "",
      CNIC: "",
      address: "",
    });
    setCpassword("");
  }

  return (
    <div className="SA-UpdateAdmin-containerdiv">
      <form className="SA-UpdateAdmin-form" onSubmit={submitHandler}>
        <img
          className="SA-Updateadmin-loginIcon"
          src={loginIcon}
          alt="SCP pic"
        />
        <h2 className="SA-Updateadmin-login-txt"> Update Admin</h2>

        <div className="SA-Updateadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-UpdateAdmin-faicons"
            icon={faIdCard}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Enter Valid ID"
            type="text"
            ref={IdRef}
            name="adminID"
            value={userInputs.ID}
            onChange={IDHandler}
          />
        </div>

        <div>
          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
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

          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <br />
            <input
              placeholder="Enter Valid Email"
              ref={emailRef}
              type="email"
              name="adminEmail"
              value={userInputs.email}
              onChange={emailHandler}
            />
          </div>

          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
              icon={faIdCard}
            ></FontAwesomeIcon>
            <br />
            <input
              placeholder="CNIC xxxxx-xxxxxxx-x"
              type="text"
              name="adminCnic"
              value={userInputs.CNIC}
              ref={cnicRef}
              onChange={CnicHandler}
            />
          </div>

          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
              icon={faAddressBook}
            ></FontAwesomeIcon>
            <br />
            <input
              placeholder="Enter Address"
              type="text"
              name="adminAddress"
              value={userInputs.address}
              ref={addressRef}
              onChange={addressHandler}
            />
          </div>

          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
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

          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
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
          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
              icon={faLock}
            ></FontAwesomeIcon>
            <br />
            <input
              placeholder="Re-Enter Password"
              type="password"
              ref={cnfrmPasswordRef}
              name="confirm-Password"
              value={cPassword}
              onChange={cPasswordHandler}
            />
          </div>
          <div className="SA-Updateadmin-singleButton-container">
            <ScreenBtn type="submit">Update Admin</ScreenBtn>
            <ScreenBtn type="button" onClick={sAdminHomePage}>
              Go Back
            </ScreenBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdmin;
