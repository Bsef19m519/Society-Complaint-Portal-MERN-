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

  const [errors, setErrors] = useState({
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
      setErrors((prevState) => ({
        ...prevState,
        complaintType: "Error: Please select a complaint type",
      }));
      return;
    } else if (userInputs.description.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        description: "Error: Please provide a description",
      }));
      return;
    } else if (
      userInputs.description.length < 10 ||
      userInputs.description.length > 1000
    ) {
      setErrors((prevState) => ({
        ...prevState,
        description: "Error: Description should be between 10 and 1000 characters",
      }));
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
          setMessage("Complaint Inserted Successfully");
          setUserInputs({
            complaintType: "",
            description: "",
          });
        } else {
          setMessage("Complaint not Inserted");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleComplaintTypeChange = (event) => {
    setErrors((prevState) => ({
      ...prevState,
      complaintType: "",
    }));

    setUserInputs((prevState) => ({
      ...prevState,
      complaintType: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setErrors((prevState) => ({
      ...prevState,
      description: "",
    }));

    setUserInputs((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
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
          >
            <option value="">Select an option</option>
            <option value="maintenance issue">Maintenance issue</option>
            <option value="security concerns">Security concerns</option>
            <option value="common area problems">Common area problems</option>
            <option value="noise and nuisance">Noise and nuisance</option>
            <option value="parking related issues">
              Parking related issues
            </option>
            <option value="complaint against any member

">
              Complaint against any member
            </option>
            <option value="others">Others</option>
          </select>
          {errors.complaintType && (
            <p className="AddComplaint-error">{errors.complaintType}</p>
          )}
        </div>
        <div className="AddComplaint-input-container">
          <label>Description:</label>
          <textarea
            name="description"
            value={userInputs.description}
            onChange={handleDescriptionChange}
            rows="5"
            cols="28"
          />
          {errors.description && (
            <p className="AddComplaint-error">{errors.description}</p>
          )}
        </div>
        <div className="AddComplaint-singleButton-container">
          <ScreenBtn type="button" onClick={goBack}>
            Back
          </ScreenBtn>
          <ScreenBtn type="submit">Add</ScreenBtn>
        </div>
        {message && <p className="Complaint-Add-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddComplaint;

