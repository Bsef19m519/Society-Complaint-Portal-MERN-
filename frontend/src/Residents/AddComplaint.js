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

  const [message, setMessage] = useState("");

  const goBack = () => {
    navigate("/Resident-front-page");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInputs.complaintType.trim() === "") {
      setMessage("Error: Please select a complaint type");
      return;
    } else if (userInputs.description.trim() === "") {
      setMessage("Error: Please provide a description");
      return;
    } else if (
      userInputs.description.length < 10 ||
      userInputs.description.length > 1000
    ) {
      setMessage("Error: Description should be between 10 and 1000 characters");
      return;
    }

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
          // alert("Complaint inserted successfully");
          setMessage("Complaint Inserted Successfully");
          setUserInputs({
            complaintType: "",
            description: "",
          });
        } else {
          // alert("Complaint not inserted successfully");
          setMessage("Complaint not Inserted");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
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
            // required
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
            // required
          />
        </div>
        <div className="AddComplaint-singleButton-container">
          <ScreenBtn type="button" onClick={goBack}>
            Back
          </ScreenBtn>
          <ScreenBtn type="submit">Add</ScreenBtn>
        </div>
        {message && <p className="AddComplaint-error">{message}</p>}
      </form>
    </div>
  );
};

export default AddComplaint;
