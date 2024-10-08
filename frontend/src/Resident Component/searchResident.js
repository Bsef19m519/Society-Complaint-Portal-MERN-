import React, { useState, useEffect } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./SearchResident.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ViewResident = () => {
  //navigate to other component
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/Admin-front-page");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  //managing input states
  const [email, setEmail] = useState(""); //managing email state
  const [tableData, setTableData] = useState([]); //managing table data state
  const [message, setMessage] = useState(""); //managing error message state

  //email handler
  async function emailHandler(event) {
    setEmail(event.target.value);
  }

  //submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3001/api/users/${email}`, {
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    if (response.ok) {
      const data = await response.json();

      setMessage("");
      setTableData([data]);
      console.log(data);
    } else {
      setMessage("Error: No Such Record Exist.");
      setTableData([]);
    }

    setEmail("");
  };

  return (
    <>
      <div className="SA-Searchadmin-container-div">
        <form
          className="SA-searchAdmin-form-container"
          onSubmit={submitHandler}
        >
          <img
            className="SA-searchAdmin-loginIcon"
            src={loginIcon}
            alt="SCP pic"
          />
          <h4 className="SA-searchAdmin-login-txt"> Search Resident</h4>
          <div className="SA-searchAdmin-singlediv-container">
            <FontAwesomeIcon
              className="SA-SearchAdmin-faicons"
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <br />
            <input
              placeholder="Search By Resident Email"
              type="email"
              name="adminEmail"
              value={email}
              onChange={emailHandler}
              required
              autoFocus
            />
          </div>
          <div className="SA-searchAdmin-singlebutton-container">
            <ScreenBtn type="button" onClick={sAdminHomePage}>
              Back
            </ScreenBtn>
            <ScreenBtn type="submit">Search </ScreenBtn>
          </div>
          <div className="superAdmin-search-message">
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
      <div className="table-container">
        {/* <h3 className="table-title">Admin Record</h3> */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>CNIC</th>
              <th>Email</th>
              <th>Phone</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((dataItem) => (
              <tr key={dataItem._id}>
                <td>{dataItem.name}</td>
                <td>{dataItem.address}</td>
                <td>{dataItem.cnic}</td>
                <td>{dataItem.email}</td>
                <td>{dataItem.phone}</td>
                <td>{dataItem._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewResident;
