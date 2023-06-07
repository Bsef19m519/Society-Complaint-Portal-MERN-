import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScreenBtn from "../components/Button/ScreenButton";
import "./addResident.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const AddResident = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/Admin-front-page");
  };

  //creating ref for dom validation
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const cnfrmpasswordRef = useRef(null);
  const phoneRef = useRef(null);
  const cnicRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);

  //state management
  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    cnic: "",
  });
  const [cPassword, setCpassword] = useState("");
  const [message, setMessage] = useState("");

  //function handlers
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
  function CpasswordHandler(event) {
    setCpassword(event.target.value);
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

  //submithandler function
  function submitHandler(event) {
    event.preventDefault();

    //client side validation
    if (nameRef.current.value.trim() === "") {
      //alert("please fill the name field ");
      setMessage("Error: Empty Name Field");
      return false;
    } else if (emailRef.current.value.trim() === "") {
      //alert("email can not be empty");
      setMessage("Error: Empty Email Field");
      return false;
    } else if (
      cnicRef.current.value.trim() === "" ||
      cnicRef.current.value.length !== 13
    ) {
      // alert(
      //   "CNIC can not be empty and must be of 13 length including special characters"
      // );
      setMessage("Error: CNIC Must Be Non-Empty And Of 13 Characters");
      return false;
    } else if (addressRef.current.value.trim() === "") {
      // alert("address field can not be empty");
      setMessage("Error: Empty Address Field");
      return false;
    }
    // } else if (phoneRef.current.value >= 0) {
    //   alert(" phone number must be valid");
    //   return false;
    // }
    else if (phoneRef.current.value.length !== 11) {
      // alert(" phone number length must be of 11 characters");
      setMessage("Error: Phone-Number Length Must Be Of 11 Characters");
      return false;
    } else if (passwordRef.current.value.trim() === "") {
      // alert("password can not be empty");
      setMessage("Error: Empty Password Field");
      return false;
    } else if (passwordRef.current.value.length < 8) {
      //alert(" password length must be atleast of 8 characters");
      setMessage("Error: Password Length Must Be Atleast 8 Characters");
      return false;
    } else if (passwordRef.current.value !== cnfrmpasswordRef.current.value) {
      //alert("password and confirm password must be same");
      setMessage("Error: Password And Confirm Password Must Be Same");
      return false;
    }

    //sending data to backend
    fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(userInputs),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Record Inserted Successfully");
        } else {
          setMessage("Error: Insertion Operation Failed");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // console.log(userInputs);
    // console.log(cPassword);
    //setting values to null after submit
    setUserInputs({
      name: "",
      email: "",
      phone: "",
      password: "",
      cnic: "",
      address: "",
    });
    setCpassword("");
  }

  return (
    <div className="SA-addAdmin-container-div">
      <form className="SA-addAdmin-form" onSubmit={submitHandler}>
        <img className="SA-Addadmin-loginIcon" src={loginIcon} alt="SCP pic" />
        <h2 className="SA-Addadmin-login-txt"> Add New Resident</h2>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
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
            ref={emailRef}
            name="adminEmail"
            value={userInputs.email}
            onChange={emailHandler}
          />
        </div>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
            icon={faIdCard}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="CNIC xxxxxxxxxxxxx"
            type="text"
            name="adminCnic"
            value={userInputs.cnic}
            ref={cnicRef}
            onChange={cnicHandler}
          />
        </div>
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
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
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
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
        <div className="SA-Addadmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-AddAdmin-faicons"
            icon={faLock}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Re-Enter Password"
            type="password"
            ref={cnfrmpasswordRef}
            name="confrmadminPassword"
            value={cPassword}
            onChange={CpasswordHandler}
          />
        </div>
        <div className="SA-Addadmin-singleButton-container">
          <ScreenBtn type="button" onClick={sAdminHomePage}>
            Back
          </ScreenBtn>
          <ScreenBtn type="submit">Add </ScreenBtn>
        </div>
        <div className="superAdmin-Add-message">
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddResident;
