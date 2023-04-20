import React, { useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./SearchAdmin.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ViewAdmin = () => {
  //navigate to other component
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/super-adminfp");
  };

  //managing input states
  const [email, setEmail] = useState("");
  function emailHandler(event) {
    setEmail(event.target.value);
  }

  const getUserData = (email) => {
    fetch(`http://localhost:3000/api/superadmin/admins/email=${email}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  //submit handler
  const submitHandler = (event) => {
    event.preventDefault();

    getUserData(email);

    setEmail("");
  };

  return (
    <div className="SA-Searchadmin-container-div">
      <form className="SA-searchAdmin-form-container" onSubmit={submitHandler}>
        <img
          className="SA-searchAdmin-loginIcon"
          src={loginIcon}
          alt="SCP pic"
        />
        <h2 className="SA-searchAdmin-login-txt"> Search Admin</h2>
        <div className="SA-searchAdmin-singlediv-container">
          <FontAwesomeIcon
            className="SA-SearchAdmin-faicons"
            icon={faEnvelope}
          ></FontAwesomeIcon>
          <br />
          <input
            placeholder="Search By Admin Email"
            type="email"
            name="adminEmail"
            value={email}
            onChange={emailHandler}
            required
            autoFocus
          />
        </div>
        <div className="SA-searchAdmin-singlebutton-container">
          <ScreenBtn type="submit">Search Admin</ScreenBtn>
          <ScreenBtn type="button" onClick={sAdminHomePage}>
            Go Back
          </ScreenBtn>
        </div>
      </form>
    </div>
  );
};

export default ViewAdmin;
