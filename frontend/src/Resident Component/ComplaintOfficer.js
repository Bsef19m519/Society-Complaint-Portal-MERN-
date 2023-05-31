import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const ComplaintOfficer = () => {
    let navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [checker, setChecker] = useState(false);



    function logOut() {
        localStorage.removeItem("token");
        navigate("/login");
    }



    const handleStatus = (event) => {
        if (event === "rejected" || event === "resolved") {
            setChecker(true);
        }
        else {
            setChecker(false);
        }
        fetch(`http://localhost:3001/api/complaints/${event}`, { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
            .then(response => response.json())
            .then(data => setTableData(data))
            .catch(error => {
                setTableData([])
            })
    }


    const updateStatus = (id, status) => {
        const data = {
            complaintStatus: status
        }
        fetch(`http://localhost:3001/api/complaints/:${id}`, {
            method: "PUT", body: JSON.stringify(data),
            headers: { "x-auth-token": localStorage.getItem("token"), "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .catch(error => {
                console.log("Cannot Process this function ", error)
            })
        window.location.reload()

    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Button
                    variant={'outlined'}
                    onClick={() => handleStatus("pending")}
                >
                    Pending
                </Button>
                <Button
                    variant={'outlined'}
                    onClick={() => handleStatus("acknowledged")}
                >
                    Acknowledged
                </Button>
                <Button
                    variant={'outlined'}
                    onClick={() => handleStatus("resolved")}
                >
                    Resolved
                </Button>
                <Button
                    variant={'outlined'}
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
                                <TableCell>Complainer Name</TableCell>
                                <TableCell>Complainer Email</TableCell>
                                <TableCell>Complaint Status</TableCell>
                                {checker ? ((<TableCell>Finalize Date</TableCell>)) : (<TableCell>Actions</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData ? tableData.map((c) => (
                                <TableRow key={c.complaintType}>
                                    <TableCell>{c.complaintType}</TableCell>
                                    <TableCell>{c.description}</TableCell>
                                    <TableCell>{c.generationDate}</TableCell>
                                    {c.complaintStatus === 'acknowledged' ?
                                        <TableCell>{c.acknowledgeDate}</TableCell> : <TableCell>Not Acknowledeged Yet</TableCell>}
                                    <TableCell>{c.complainer.name}</TableCell>
                                    <TableCell>{c.complainer.email}</TableCell>
                                    <TableCell>{c.complaintStatus}</TableCell>

                                    {checker ? (<TableCell>{c.finalizeDate}</TableCell>) : (<TableCell>
                                        {c.complaintStatus === 'acknowledged' ? (
                                            <>
                                                <Button variant="contained" onClick={() => updateStatus(c._id, "rejected")}
                                                    sx={{ margin: "10px" }}>Reject</Button>
                                                <Button variant="contained" sx={{ margin: "10px" }} onClick={() => updateStatus(c._id, "resolved")}>Resolve</Button>
                                            </>
                                        ) : (c.complaintStatus === 'pending' && <Button variant="contained" onClick={() => updateStatus(c._id, "acknowledged")}>Acknowledge</Button>
                                        )}
                                    </TableCell>)}
                                </TableRow>
                            )) : (alert("No Records Found"))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "40px" }}>

                <Button
                    variant={'outlined'}
                    onClick={() => logOut()}
                >
                    Logout
                </Button>
            </Box>
        </Box >
    );
};
export default ComplaintOfficer;
