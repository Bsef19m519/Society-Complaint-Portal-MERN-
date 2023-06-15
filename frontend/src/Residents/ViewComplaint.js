import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      navigate("/login");
    }

    setIsPending(!isPending);

    const event = "pending";
    fetch(`http://localhost:3001/api/complaints/me/:${event}`, {
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => {
        console.log("Got an error");
      });
  }, []);

  const handleStatus = (event) => {
    setIsAckn(true);
    setIsRej(true);
    setIsRes(true);
    setIsPending(true);
    if (event === "pending") {
      setIsPending(!isPending);
    } else if (event === "acknowledged") {
      setIsAckn(!isAckn);
    } else if (event === "resolved") {
      setIsRes(!isRes);
    } else {
      setIsRej(!isRej);
    }
    // console.log(event)
    if (event === "rejected" || event === "resolved") {
      setChecker(true);
    } else {
      setChecker(false);
    }
    fetch(`http://localhost:3001/api/complaints/me/:${event}`, {
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => {
        console.log("Got an error");
      });
  };

  const goBack = () => {
    navigate("/Resident-front-page");
  };

  function formateDate(d) {
    const date = new Date(d)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  return (
    <Box>
      <Button sx={{ margin: "20px" }} variant="contained" onClick={goBack}>
        Back
      </Button>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Button
          variant={isPending ? "outlined" : "contained"}
          onClick={() => handleStatus("pending")}
        >
          Pending
        </Button>
        <Button
          variant={isAckn ? "outlined" : "contained"}
          onClick={() => handleStatus("acknowledged")}
        >
          Acknowledged
        </Button>
        <Button
          variant={isRes ? "outlined" : "contained"}
          onClick={() => handleStatus("resolved")}
        >
          Resolved
        </Button>
        <Button
          variant={isRej ? "outlined" : "contained"}
          onClick={() => handleStatus("rejected")}
        >
          Rejected
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          marginTop: "40px",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Complaint Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Genration Date</TableCell>
                <TableCell>Acknowledged Date</TableCell>
                <TableCell>Complaint Status</TableCell>
                {checker && <TableCell>Finalize Date</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData
                ? tableData.map((c) => (
                  <TableRow key={c.complaintType}>
                    <TableCell>{c.complaintType}</TableCell>
                    <TableCell>{c.description}</TableCell>
                    <TableCell>{formateDate(c.generationDate)}</TableCell>
                    {c.complaintStatus === "pending" ? (
                      <TableCell>Not Acknowledeged Yet</TableCell>
                    ) : (
                      <TableCell>{formateDate(c.acknowledgeDate)}</TableCell>
                    )}

                    <TableCell>{c.complaintStatus}</TableCell>
                    {checker && (
                      <TableCell>{formateDate(c.finalizeDate)}</TableCell>
                    )}
                  </TableRow>
                ))
                : alert("No Records Found")}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default ViewComplaint;
