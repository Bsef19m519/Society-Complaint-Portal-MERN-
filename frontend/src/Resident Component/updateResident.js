import React, { useState, useRef, useEffect } from "react";
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
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/Admin-front-page");
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
  const [error, setError] = useState("");
  const [successmessage, setsuccessMessage] = useState("");
  const [message, setMessage] = useState({
    prevEmail: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    cnic: "",
    confirmPassword: "",
  });

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

  //focusOut Validation
  const focusOut = (field) => () => {
    switch (field) {
      case "prevEmail":
        if (preEmailRef.current.value.trim() === "") {
          setsuccessMessage("");

          setMessage((prevmessage) => ({
            ...prevmessage,
            prevEmail: "Error: Empty Email Field",
          }));
          return false;
        } else {
          setsuccessMessage("");

          setMessage((prevmessage) => ({
            ...prevmessage,
            prevEmail: "",
          }));
        }
        break;

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
        if (passwordRef.current.value !== cnfrmPasswordRef.current.value) {
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

  function submitHandler(event) {
    event.preventDefault();

    // if (preEmailRef.current.value.trim() === "") {
    //   setsuccessMessage("");
    //   setMessage("Error: Empty Email Field");
    //   return false;
    // } else if (nameRef.current.value.trim() === "") {
    //   setsuccessMessage("");
    //   setMessage("Error: Empty Name Field");
    //   return false;
    // } else if (emailRef.current.value.trim() === "") {
    //   setsuccessMessage("");
    //   setMessage("Error: Empty Email Field");
    //   return false;
    // } else if (
    //   cnicRef.current.value.trim() === "" ||
    //   cnicRef.current.value.length !== 13
    // ) {
    //   setsuccessMessage("");
    //   setMessage("Error: CNIC Must Be Non-Empty And Of 13 Characters");
    //   return false;
    // } else if (addressRef.current.value.trim() === "") {
    //   setsuccessMessage("");
    //   setMessage("Error: Empty Address Field");
    //   return false;
    // } else if (phoneRef.current.value.length !== 11) {
    //   setsuccessMessage("");
    //   setMessage("Error: Phone-Number Length Must Be Of 11 Characters");
    //   return false;
    // } else if (passwordRef.current.value.trim() === "") {
    //   setsuccessMessage("");
    //   setMessage("Error: Empty Password Field");
    //   return false;
    // } else if (passwordRef.current.value.length < 8) {
    //   // alert(" password length must be atleast of 8 characters");
    //   setsuccessMessage("");
    //   setMessage("Error: Password Length Must Be Atleast 8 Characters");
    //   return false;
    // } else if (passwordRef.current.value !== cnfrmPasswordRef.current.value) {
    //   // alert("password and confirm password must be same");
    //   setsuccessMessage("");
    //   setMessage("Error: Password And Confirm Password Must Be Same");
    //   return false;
    // }

    //sending data to backend
    fetch(`http://localhost:3001/api/users/${preEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(userInputs),
    })
      .then((response) => {
        if (response.ok) {
          setError("");
          setsuccessMessage("Record Updated Successfully");
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
        } else {
          setsuccessMessage("");
          setError(
            "Error: Fill The Form Properly.Previoue Email Should Be Existed. Update Operation Failed"
          );
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // console.log(userInputs);
    // console.log(cPassword);
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
          <input
            placeholder="Enter Previous Existing Email"
            type="email"
            ref={preEmailRef}
            name="adminpemail"
            value={preEmail}
            onChange={preEmailHandler}
            onBlur={focusOut("prevEmail")}
          />
          {message.prevEmail && (
            <span className="superAdmin-Updateerror-message">
              {message.prevEmail}
            </span>
          )}
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
              onBlur={focusOut("name")}
            />
            {message.name && (
              <span className="superAdmin-Updateerror-message">
                {message.name}
              </span>
            )}
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
              onBlur={focusOut("email")}
            />
            {message.email && (
              <span className="superAdmin-Updateerror-message">
                {message.email}
              </span>
            )}
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
              onBlur={focusOut("cnic")}
            />
            {message.cnic && (
              <span className="superAdmin-Updateerror-message">
                {message.cnic}
              </span>
            )}
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
              onBlur={focusOut("address")}
            />
            {message.address && (
              <span className="superAdmin-Updateerror-message">
                {message.address}
              </span>
            )}
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
              onBlur={focusOut("phone")}
            />{" "}
            {message.phone && (
              <span className="superAdmin-Updateerror-message">
                {message.phone}
              </span>
            )}
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
              onBlur={focusOut("password")}
            />
            {message.password && (
              <span className="superAdmin-Updateerror-message">
                {message.password}
              </span>
            )}
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
              onBlur={focusOut("confirmPassword")}
            />
            {message.confirmPassword && (
              <span className="superAdmin-Updateerror-message">
                {message.confirmPassword}
              </span>
            )}
          </div>
          <div className="SA-Updateadmin-singleButton-container">
            <ScreenBtn type="button" onClick={sAdminHomePage}>
              Back
            </ScreenBtn>
            <ScreenBtn type="submit">Update </ScreenBtn>
          </div>
        </div>
        <div className="superAdmin-Update-Error-message">
          {error && <p>{error}</p>}
        </div>
        <div className="superAdmin-Updatesuccess-message">
          {successmessage && <p>{successmessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateResident;
