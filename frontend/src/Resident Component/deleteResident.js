import React, { useState, useEffect } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./DeleteResident.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const DeleteResident = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  //navigate to others component
  const sAdminHomePage = () => {
    navigate("/Admin-front-page");
  };

  //handling input state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successmessage, setsuccessMessage] = useState("");
  function emailHandler(event) {
    setEmail(event.target.value);
  }

  //submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/users/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        // const data = await response.json();
        setMessage("");
        setsuccessMessage("Record Deleted Successfully.");
        setEmail("");
      } else {
        setsuccessMessage("");
        setMessage("Error: Record Not Found.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="SA-Deleteadmin-container-div">
      <form className="SA-DeleteAdmin-form-container" onSubmit={submitHandler}>
        <img
          className="SA-DeleteAdmin-loginIcon"
          src={loginIcon}
          alt="SCP pic"
        />
        <h4 className="SA-DeleteAdmin-login-txt"> Delete Resident</h4>
        <div className="SA-DeleteAdmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-DeleteAdmin-faicons"
            icon={faEnvelope}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Delete By Email"
            type="email"
            name="adminEmail"
            value={email}
            onChange={emailHandler}
            required
            autoFocus
          />
        </div>
        <div className="SA-DeleteAdmin-singleButton-container">
          <ScreenBtn type="button" onClick={sAdminHomePage}>
            Back
          </ScreenBtn>
          <ScreenBtn type="submit">Delete</ScreenBtn>
        </div>
        <div className="superAdmin-deleteerror-message">
          {message && <p>{message}</p>}
        </div>
        <div className="superAdmin-deletesuccess-message">
          {successmessage && <p>{successmessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default DeleteResident;
