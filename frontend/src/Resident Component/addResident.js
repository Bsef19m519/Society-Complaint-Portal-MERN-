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

  const [successmessage, setsuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    cnic: "",
    confirmPassword: "",
  });

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

  //error handler
  const focusOut = (field) => () => {
    switch (field) {
      case "name":
        if (nameRef.current.value.trim() === "") {
          //alert("please fill the name field ");
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            name: "Error: Empty Name Field",
          }));
          return false;
        } else {
          setsuccessMessage("");

          setMessage((prevmessage) => ({
            ...prevmessage,
            name: "",
          }));
        }
        break;

      case "email":
        if (emailRef.current.value.trim() === "") {
          //alert("email can not be empty");
          setsuccessMessage("");

          setMessage((prevmessage) => ({
            ...prevmessage,
            email: "Error: Empty Email Field",
          }));
          return false;
        } else {
          setsuccessMessage("");

          setMessage((prevmessage) => ({
            ...prevmessage,
            email: "",
          }));
        }
        break;

      case "cnic":
        if (cnicRef.current.value.trim() === "") {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            cnic: "Error: CNIC Must Be Non-Empty",
          }));
          return false;
        } else if (cnicRef.current.value.length !== 13) {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            cnic: "Error: CNIC Must Contain 13 Characters",
          }));
        } else {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            cnic: "",
          }));
        }
        break;

      case "address":
        if (addressRef.current.value.trim() === "") {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            address: "Error: Empty Address Field",
          }));
          return false;
        } else {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            address: "",
          }));
        }
        break;

      case "phone":
        if (phoneRef.current.value.length !== 11) {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            phone: "Phone-Number Length Must Be Of 11 Characters",
          }));

          return false;
        } else {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            phone: "",
          }));
        }
        break;

      case "password":
        if (passwordRef.current.value.trim() === "") {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            password: "Error: Empty Password Field",
          }));

          return false;
        } else if (passwordRef.current.value.length < 8) {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            password: "Error: Password Length Must Be Atleast 8 Characters",
          }));

          return false;
        } else {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            password: "",
          }));
        }
        break;

      case "confirmPassword":
        if (passwordRef.current.value !== cnfrmpasswordRef.current.value) {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            confirmPassword:
              "Error: Password And Confirm Password Must Be Same",
          }));

          return false;
        } else {
          setsuccessMessage("");
          setMessage((prevmessage) => ({
            ...prevmessage,
            confirmPassword: "",
          }));
        }
    }
  };

  //submithandler function
  function submitHandler(event) {
    event.preventDefault();

    for (const key in message) {
      if (message[key]) {
        return false; // Do not submit the form if there are errors
      }
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
          setError("");
          setsuccessMessage("Record Inserted Successfully");
          setUserInputs({
            name: "",
            email: "",
            phone: "",
            password: "",
            cnic: "",
            address: "",
          });
          setCpassword("");
        } else if (response.status === 400) {
          setsuccessMessage("");
          setError(
            "Error:Fill The Form Properly. Duplicate Email , Cnic , Phone No Are Not Allowed"
          );
          return false;
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    //setting values to null after submit
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
            onBlur={focusOut("name")}
          />
          {message.name && (
            <span className="superAdmin-Adderror-message">{message.name}</span>
          )}
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
            onBlur={focusOut("email")}
          />
          {message.email && (
            <span className="superAdmin-Adderror-message">{message.email}</span>
          )}
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
            onBlur={focusOut("cnic")}
          />
          {message.cnic && (
            <span className="superAdmin-Adderror-message">{message.cnic}</span>
          )}
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
            onBlur={focusOut("address")}
          />
          {message.address && (
            <span className="superAdmin-Adderror-message">
              {message.address}
            </span>
          )}
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
            onBlur={focusOut("phone")}
          />
          {message.phone && (
            <span className="superAdmin-Adderror-message">{message.phone}</span>
          )}
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
            onBlur={focusOut("password")}
          />
          {message.password && (
            <span className="superAdmin-Adderror-message">
              {message.password}
            </span>
          )}
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
            onBlur={focusOut("confirmPassword")}
          />
          {message.confirmPassword && (
            <span className="superAdmin-Adderror-message">
              {message.confirmPassword}
            </span>
          )}
        </div>
        <div className="SA-Addadmin-singleButton-container">
          <ScreenBtn type="button" onClick={sAdminHomePage}>
            Back
          </ScreenBtn>
          <ScreenBtn type="submit">Add </ScreenBtn>
        </div>
        <div className="superAdmin-Error-message">
          {error && <p>{error}</p>}
        </div>
        <div className="superAdmin-Addsuccess-message">
          {successmessage && <p>{successmessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddResident;
