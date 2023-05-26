import React from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import "./ViewComplaint.css";
import { useNavigate } from "react-router-dom";

const ViewComplaint = () => {
  let navigate = useNavigate();
  const goBack = () => {
    navigate("/Resident-front-page");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="view-txt">Check Your Complaint Status!!!</h1>
        <div className="view-Complaint-form-container">
          <div className="view-container">
            <label>Address:</label>
            <br />
            <input
              type="text"
              name="usearch"
              placeholder="search"
              required
              autoFocus
            />
          </div>
          {/* <div className="view-container">
          <label>Complaint Id:</label><br/>
          <input type="text" name="residance"  required /> 
        </div>
        <div className="register-container">
          <label>Description:</label><br/>
          <textarea  name="w3review" rows="5" cols="100" />
          
        </div>
        <div className="register-container">
          <label>Proof:</label><br/>
          <input type="file" name="G-proof"  required/>
          </div>
           */}

          <div className="view-complaint-button">
            <ScreenBtn type="submit">View Complaint</ScreenBtn>
            <ScreenBtn type="button" onClick={goBack}>
              Back
            </ScreenBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewComplaint;
