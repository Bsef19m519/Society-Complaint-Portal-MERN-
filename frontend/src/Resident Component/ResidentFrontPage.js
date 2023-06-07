import React, { useEffect } from "react";
import StylishButton from "../components/Button/StylishButtons";
import { useNavigate } from "react-router-dom";
import "./ResidentFrontPage.css";
import loginIcon from "../components/Header/SCP3.png";

const SAFrontPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      //console.log(localStorage);
      navigate("/login");
    }
  });

  // function logOut() {
  //   // console.log(localStorage.getItem("token"));
  //   localStorage.removeItem("token");
  //   navigate("/login");
  //   // console.log(localStorage.getItem("token"));
  //   //
  // }

  const addNewResident = () => {
    navigate("/add-resident");
  };

  const viewResident = () => {
    navigate("/view-resident");
  };

  const updateResident = () => {
    navigate("/update-resident");
  };

  const deleteResident = () => {
    navigate("/delete-resident");
  };

  return (
    <div className="SAcontainerDiv">
      <div className="SA-content-container-div">
        <img className="SAloginIcon" src={loginIcon} alt="SCP pic" />
        <h2 className="SAlogin-txt"> Maintain Record</h2>
        <div className="SA-screen-button-div">
          <StylishButton type="button" onClick={addNewResident}>
            Add Resident
          </StylishButton>
          <StylishButton type="button" onClick={viewResident}>
            View Resident
          </StylishButton>
          <StylishButton type="button" onClick={updateResident}>
            Update Resident
          </StylishButton>
          <StylishButton type="button" onClick={deleteResident}>
            Delete Resident
          </StylishButton>
          {/* <div className="superAdmin-logout-button">
            <ScreenBtn onClick={logOut}>Log Out</ScreenBtn>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SAFrontPage;
