import React, { useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./AddComplaint.css";

const AddComplaint = () => {
  const navigate = useNavigate();
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");

  const goBack = () => {
    navigate("/front-page");
  };

  const alertMessage = () => {
    alert("Fake complaints will lead to a penalty against the complainer!!!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform further actions with the complaintType and description values
  };

  const handleComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="AddComplaint-container-div">
      <form className="AddComplaint-form-container" onSubmit={handleSubmit}>
        <h1 className="AddComplaint-heading">Add Complaint</h1>
        <div className="AddComplaint-input-container">
          <label>Complaint Type:</label>
          <select
            value={complaintType}
            onChange={handleComplaintTypeChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Maintenance issue">Maintenance issue</option>
            <option value="Security concerns">Security concerns</option>
            <option value="Common area problems">Common area problems</option>
            <option value="Noise and nuisance">Noise and nuisance</option>
            <option value="Parking related issues">Parking related issues</option>
            <option value="Complaint against any member">
              Complaint against any member
            </option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="AddComplaint-input-container">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="5"
            minLength={10}
            maxLength={1000}
            required
          />
        </div>
        <div className="AddComplaint-singleButton-container">
          <ScreenBtn type="submit" onClick={alertMessage}>
            Add 
          </ScreenBtn>
          <ScreenBtn type="button" onClick={goBack}>
            Back
          </ScreenBtn>
        </div>
      </form>
    </div>
  );
};

export default AddComplaint;
