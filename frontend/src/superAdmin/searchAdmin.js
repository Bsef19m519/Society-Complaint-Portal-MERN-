import React, { useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import "./SearchAdmin.css";
import loginIcon from "../components/Header/SCP3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChampagneGlasses,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import TableData from "./showTableData";
import getHeader from "../utils";

const ViewAdmin = () => {
  //navigate to other component
  let navigate = useNavigate();
  const sAdminHomePage = () => {
    navigate("/super-adminfp");
  };

  //managing input states
  const [email, setEmail] = useState(""); //managing email state
  const [tableData, setTableData] = useState([]); //managing table data state

  //email handler
  async function emailHandler(event) {
    setEmail(event.target.value);
  }

  // const getUserData = () => {
  //   fetch(`http://localhost:3000/api/superadmin/admins/email=${email}`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  //submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    // const emailParam = event.target.elements.email.value;
    const response = await fetch(
      `http://localhost:3000/api/superadmin/admins/${email}`,
      {
        method: "GET",
        headers: { ...getHeader().get("Authorization") },
      }
    );
    const data = await response.json();
    console.log(data);
    setTableData(data);

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

export default ViewAdmin;
