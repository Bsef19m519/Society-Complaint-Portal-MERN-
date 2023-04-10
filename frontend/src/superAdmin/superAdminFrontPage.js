import React from "react";
import StylishButton from "../components/Button/StylishButtons";
import { useNavigate } from "react-router-dom";
import "./superAdminFrontPage.css";
import loginIcon from "../components/Header/SCP3.png";

const SAFrontPage = () => {
  let navigate = useNavigate();
  // let navigate2 = useNavigate();
  // let navigate3 = useNavigate();
  // let navigate4 = useNavigate();

  const addNewAdmin = () => {
    navigate("/add-admin");
  };

  const viewAdmin = () => {
    navigate("/view-admin");
  };

  const updateAdmin = () => {
    navigate("/update-admin");
  };

  const deleteAdmin = () => {
    navigate("/delete-admin");
  };

  return (
    <div className="SAcontainerDiv">
      <div className="SA-content-container-div">
        <img className="SAloginIcon" src={loginIcon} alt="SCP pic" />
        <h2 className="SAlogin-txt"> Maintain Record</h2>
        <div className="SA-screen-button-div">
          <StylishButton type="button" onClick={addNewAdmin}>
            Add New Admin
          </StylishButton>
          <StylishButton type="button" onClick={viewAdmin}>
            View Admin
          </StylishButton>
          <StylishButton type="button" onClick={updateAdmin}>
            Update Admin
          </StylishButton>
          <StylishButton type="button" onClick={deleteAdmin}>
            Delete Admin
          </StylishButton>
        </div>
      </div>
    </div>
  );
};

export default SAFrontPage;
