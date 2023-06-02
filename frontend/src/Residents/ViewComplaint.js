// import React, { useState, useEffect } from "react";
// import "./ViewComplaint.css";
// import ScreenButton from "../components/Button/ScreenButton";
// import { useNavigate } from "react-router-dom";
// import getHeader from "../utils";

// const ViewComplaint = () => {
//   const navigate = useNavigate();
//   const [statusFilter, setStatusFilter] = useState("All"); // State to store the selected status filter

//   const goBack = () => {
//     navigate("/Resident-front-page");
//   };

//   const [tableData, setTableData] = useState([]);
//   //fectcomplaints is not the real function. the name will be modified with respect to the name in backend.

//   // const fetchComplaints = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:3001/api/complaints", {
//   //       headers: { ...getHeader().get("Authorization") },
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setTableData(data);
//   //     } else {
//   //       console.log("Error: Fetching complaints failed.");
//   //     }
//   //   } catch (error) {
//   //     console.log("Error:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchComplaints(statusFilter);
//   // }, [statusFilter]);

//   return (
//     <div className="VC-Viewcomplaint-container-div">
//       <div className="VC-viewComplaint-form-container">
//         <h2 className="VC-viewComplaint-heading">View Complaint Status</h2>
//         <div className="VC-viewComplaint-singlebutton-container">
//           <div className="status-filter-container">
//             <label htmlFor="status-filter">Status Filter:</label>
//             <select
//               id="status-filter"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="PENDING">PENDING</option>
//               <option value="RESOLVED">RESOLVED</option>
//             </select>
//             <ScreenButton type="button" onClick={goBack}>
//               Back
//             </ScreenButton>
//           </div>
//         </div>
//       </div>

//       <table className="data-table">
//         <thead>
//           <tr>
//             <th className="data-table-header">Complaint Type</th>
//             <th className="data-table-header">Description</th>
//             <th className="data-table-header">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((dataItem) => (
//             <tr key={dataItem._id}>
//               <td>{dataItem.complaintType}</td>
//               <td>{dataItem.description}</td>
//               <td>{dataItem.complaintStatus}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewComplaint;



import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import ScreenBtn from "../components/Button/ScreenButton";


const ViewComplaint = () => {
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [checker, setChecker] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isAckn, setIsAckn] = useState(true);
  const [isRes, setIsRes] = useState(true);
  const [isRej, setIsRej] = useState(true);




  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }

    
    setIsPending(!isPending);

    const event = "pending"
    fetch(`http://localhost:3001/api/complaints/me/:${event}`, { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => {
        console.log("Got an error")
      })
  }, [])

  const handleStatus = (event) => {
    setIsAckn(true);
    setIsRej(true);
    setIsRes(true);
    setIsPending(true);
    if (event === "pending") {
      setIsPending(!isPending)
    }
    else if (event === "acknowledged") {
      setIsAckn(!isAckn);
    }
    else if (event === "resolved") {
      setIsRes(!isRes)
    }
    else {
      setIsRej(!isRej)
    }
    // console.log(event)
    if (event === "rejected" || event === "resolved") {
      setChecker(true);
    }
    else {
      setChecker(false);
    }
    fetch(`http://localhost:3001/api/complaints/me/:${event}`, { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => {
        console.log("Got an error")
      })
  }

  const goBack = () => {
    navigate("/Resident-front-page");
  };
  const formateDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate; // Example output: "2023-05-31"

  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <Button
          variant={isPending ? 'outlined' : 'contained'}
          onClick={() => handleStatus("pending")}
        >
          Pending
        </Button>
        <Button
          variant={isAckn ? 'outlined' : 'contained'}
          onClick={() => handleStatus("acknowledged")}
        >
          Acknowledged
        </Button>
        <Button
          variant={isRes ? 'outlined' : 'contained'}
          onClick={() => handleStatus("resolved")}
        >
          Resolved
        </Button>
        <Button
          variant={isRej ? 'outlined' : 'contained'}
          onClick={() => handleStatus("rejected")}
        >
          Rejected
        </Button>

     

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: "10px", marginTop: "40px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Complaint Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Genration Date</TableCell>
                <TableCell>Acknowledged Date</TableCell>
                <TableCell>Complaint Status</TableCell>
                {checker && ((<TableCell>Finalize Date</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData ? tableData.map((c) => (
                <TableRow key={c.complaintType}>
                  <TableCell>{c.complaintType}</TableCell>
                  <TableCell>{c.description}</TableCell>
                  <TableCell>{formateDate(c.generationDate)}</TableCell>
                  {c.complaintStatus === 'pending' ?
                    <TableCell>Not Acknowledeged Yet</TableCell> : <TableCell>{formateDate(c.acknowledgeDate)}</TableCell>}

                  <TableCell>{c.complaintStatus}</TableCell>
                  {checker && (<TableCell>{formateDate(c.finalizeDate)}</TableCell>)}
                </TableRow>
              )) : (alert("No Records Found"))}

            </TableBody>
            
          </Table>
          
        </TableContainer>
      </Box>
      <div className="button">
        <ScreenBtn type="button" onClick={goBack}>
        Back
        </ScreenBtn>
        </div>

    </Box >
  );
};
export default ViewComplaint;

