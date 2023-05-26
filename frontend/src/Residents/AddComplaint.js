import React from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import "./AddComplaint.css";
import { useNavigate } from "react-router-dom";

const AddNewComplaint = () => {
  let navigate = useNavigate();
  const goBack = () => {
    navigate("/Resident-front-page");
  };

  //creating alert for complainer
  const alertMessage = () => {
    alert("Fake complaint will lead to penalty against complainer!!!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="register-txt">Register Your Complaint Carefully!!!</h1>
        <div className="Complaint-form-container">
          <div className="register-container">
            <label>Name:</label>
            <br />
            <input type="text" name="uname" required autoFocus />
          </div>
          <div className="register-container">
            <label>Address:</label>
            <br />
            <input type="text" name="residance" required />
          </div>
          <div className="register-container">
            <label>Description:</label>
            <br />
            <textarea name="w3review" rows="5" cols="100" />
          </div>
          <div className="register-container">
            <label>Proof:</label>
            <br />
            <input type="file" name="G-proof" required />
          </div>
          <div className="complaint-button">
            <ScreenBtn type="submit" onClick={alertMessage}>
              Add Complaint
            </ScreenBtn>
            <ScreenBtn type="button" onClick={goBack}>
              Back
            </ScreenBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewComplaint;
