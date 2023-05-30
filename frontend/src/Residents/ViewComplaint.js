import React, { useState, useEffect } from "react";
import "./ViewComplaint.css";
import ScreenButton from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";
import getHeader from "../utils";

const ViewComplaint = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All'); // State to store the selected status filter

  const goBack = () => {
    navigate("/Resident-front-page");
  };

  const [tableData, setTableData] = useState([]);
  //fectcomplaints is not the real function. the name will be modified with respect to the name in backend.

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/complaints", {
        headers: { ...getHeader().get("Authorization") },
      });

        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.log("Error: Fetching complaints failed.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
      const response = await fetch(url, {
        headers: { ...getHeader().get('Authorization') },
      });

      if (response.ok) {
        const data = await response.json();
        setTableData(data);
      } else {
        console.log('Error: Fetching complaints failed.');
      }
    }

    catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchComplaints(statusFilter);
  }, [statusFilter]);

  return (
    <div className="VC-Viewcomplaint-container-div">
      <div className="VC-viewComplaint-form-container">
        <h2 className="VC-viewComplaint-heading">View Complaint Status</h2>
        <div className="VC-viewComplaint-singlebutton-container">
          <div className="status-filter-container">
            <label htmlFor="status-filter">Status Filter:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="PENDING">PENDING</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
            <ScreenButton type="button" onClick={goBack}>
              Back
            </ScreenButton>
          </div>
        </div>


          <div className="status-filter-container">
            <label htmlFor="status-filter">Status Filter:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="PENDING">PENDING</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
            <ScreenButton type="button" onClick={goBack}>
              Back
            </ScreenButton>
          </div>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table-header">Complaint Type</th>
            <th className="data-table-header">Description</th>
            <th className="data-table-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((dataItem) => (
            <tr key={dataItem._id}>
              <td>{dataItem.complaintType}</td>
              <td>{dataItem.description}</td>
              <td>{dataItem.complaintStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default ViewComplaint;
