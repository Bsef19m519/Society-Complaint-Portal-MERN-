import React, { useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./DeleteAdmin.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const DeleteAdmin = () => {
  //navigate to others component
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/super-adminfp");
  };

  //handling input state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  function emailHandler(event) {
    setEmail(event.target.value);
  }

  //submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/superadmin/admins/${email}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage("Record Deleted Successfully.");
      } else {
        setMessage("Error: Deletion operation did'nt perform.");
      }
    } catch (error) {
      console.error(error);
    }

    setEmail("");
  };

  return (
    <div className="SA-Deleteadmin-container-div">
      <form className="SA-DeleteAdmin-form-container" onSubmit={submitHandler}>
        <img
          className="SA-DeleteAdmin-loginIcon"
          src={loginIcon}
          alt="SCP pic"
        />
        <h2 className="SA-DeleteAdmin-login-txt"> Delete Admin</h2>
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
          <ScreenBtn type="submit">Delete</ScreenBtn>
          <ScreenBtn type="button" onClick={sAdminHomePage}>
            Back
          </ScreenBtn>
        </div>
        <div className="superAdmin-delete-message">
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default DeleteAdmin;
