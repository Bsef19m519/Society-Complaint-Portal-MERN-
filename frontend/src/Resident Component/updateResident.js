import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScreenBtn from "../components/Button/ScreenButton";
import "./UpdateResident.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const UpdateResident = () => {
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/super-adminfp");
  };

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const preEmailRef = useRef(null);
  const cnicRef = useRef(null);
  const addressRef = useRef(null);
  const cnfrmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cnic: "",
    address: "",
  });
  const [cPassword, setCpassword] = useState("");
  const [preEmail, setPreEmail] = useState("");
  const [message, setMessage] = useState("");

  function preEmailHandler(event) {
    setPreEmail(event.target.value);
  }
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

  function cnicHandler(event) {
    setUserInputs({
      ...userInputs,
      cnic: event.target.value,
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

    if (preEmailRef.current.value.trim() === "") {
      alert("Please Enter Already setted email");
      return false;
    } else if (nameRef.current.value.trim() === "") {
      alert("please fill the name field ");
      return false;
    } else if (emailRef.current.value.trim() === "") {
      alert("email can not be empty");
      return false;
    } else if (
      cnicRef.current.value.trim() === "" ||
      cnicRef.current.value.length !== 13
    ) {
      alert("cnic can not be empty and must be of 13 length ");
      return false;
    } else if (addressRef.current.value.trim() === "") {
      alert("address field can not be empty");
      return false;
    } else if (phoneRef.current.value.length !== 11) {
      alert(" phone number length must be of 11 characters");
      return false;
    }
    //  } else if (phoneRef.current.value >= 0) {
    //   alert(" phone number must be valid");
    //   return false;
    // }
    else if (passwordRef.current.value.trim() === "") {
      alert("password field can not be empty");
      return false;
    } else if (passwordRef.current.value.length < 8) {
      alert(" password length must be atleast of 8 characters");
      return false;
    } else if (passwordRef.current.value !== cnfrmPasswordRef.current.value) {
      alert("password and confirm password must be same");
      return false;
    }

    //sending data to backend
    fetch(`http://localhost:3001/api/users/${preEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputs),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Record Updated Successfully");
        } else {
          setMessage("Error: Update Operation Failed");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // console.log(userInputs);
    // console.log(cPassword);
    setUserInputs({
      name: "",
      email: "",
      phone: "",
      password: "",
      cnic: "",
      address: "",
    });
    setCpassword("");
    setPreEmail("");
  }

  return (
    <div className="SA-UpdateAdmin-containerdiv">
      <form className="SA-UpdateAdmin-form" onSubmit={submitHandler}>
        <img
          className="SA-Updateadmin-loginIcon"
          src={loginIcon}
          alt="SCP pic"
        />
        <h2 className="SA-Updateadmin-login-txt"> Update Resident</h2>

        <div className="SA-Updateadmin-singlediv-container">
          {/* <FontAwesomeIcon
            className="SA-UpdateAdmin-faicons"
            icon={faEnvelope}
          ></FontAwesomeIcon>
          <label className="updateAdminLabel">
            <b>Admin Email:</b>
          </label>
          <br /> */}

          <input
            placeholder="Enter Previous Existing Email"
            type="email"
            ref={preEmailRef}
            name="adminpemail"
            value={preEmail}
            onChange={preEmailHandler}
          />
        </div>
        <hr />
        <div>
          <div className="SA-Updateadmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-UpdateAdmin-faicons"
              icon={faPerson}
            ></FontAwesomeIcon>
            <br />
            <input
              placeholder="Enter Name"
              type="text"
              name="adminName"
              ref={nameRef}
              value={userInputs.name}
              onChange={nameHandler}
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
              placeholder="CNIC xxxxxxxxxxxxx"
              type="text"
              name="admincnic"
              value={userInputs.cnic}
              ref={cnicRef}
              onChange={cnicHandler}
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
              placeholder="Phone-Number 03xxxxxxxxx"
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
            <ScreenBtn type="submit">Update </ScreenBtn>
            <ScreenBtn type="button" onClick={sAdminHomePage}>
              Back
            </ScreenBtn>
          </div>
        </div>
        <div className="superAdmin-Update-message">
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateResident;
