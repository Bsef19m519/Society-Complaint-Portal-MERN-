import React, { useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./AddComplaint.css";

const AddComplaint = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    complaintType: "",
    description: "",
  });

  const goBack = () => {
    navigate("/Resident-front-page");
  };

  // const alertMessage = () => {
  //   alert("Fake complaints will lead to a penalty against the complainer!!!");
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInputs);
    fetch("http://localhost:3001/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(userInputs),
    })
      .then((response) => {
        if (response.ok) {
          //setMessage("Record Inserted Successfully");
          alert("complaint inserted succcessfully");
        } else {
          //setMessage("Error: Insertion Operation Failed");
          alert("complaint not inserted succcessfully");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    // Perform further actions with the complaintType and description values
  };

  const handleComplaintTypeChange = (event) => {
    setUserInputs({
      ...userInputs,
      complaintType: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setUserInputs({
      ...userInputs,
      description: event.target.value,
    });
  };

  return (
    <div className="AddComplaint-container-div">
      <form className="AddComplaint-form-container" onSubmit={handleSubmit}>
        <h1 className="AddComplaint-heading">Add Complaint</h1>
        <div className="AddComplaint-input-container">
          <label>Complaint Type:</label>
          <select
            value={userInputs.complaintType}
            onChange={handleComplaintTypeChange}
            required
          >
            <option value="">Select an option</option>
            <option value="maintenance issue">Maintenance issue</option>
            <option value="security concerns">Security concerns</option>
            <option value="common area problems">Common area problems</option>
            <option value="noise and nuisance">Noise and nuisance</option>
            <option value="parking related issues">
              Parking related issues
            </option>
            <option value="complaint against any member">
              Complaint against any member
            </option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="AddComplaint-input-container">
          <label>Description:</label>
          <textarea
            name="description"
            value={userInputs.description}
            onChange={handleDescriptionChange}
            rows="5"
            cols="28"
            minLength={10}
            maxLength={1000}
            required
          />
        </div>
        <div className="AddComplaint-singleButton-container">
          <ScreenBtn type="button" onClick={goBack}>
            Back
          </ScreenBtn>
          <ScreenBtn type="submit">Add</ScreenBtn>
        </div>
      </form>
    </div>
  );
};

export default AddComplaint;