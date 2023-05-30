import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const ComplaintOfficer = () => {
    let navigate = useNavigate();
    const [tableData, setTableData] = useState([]);


    // useEffect(() => {
    //     fetch('http://localhost:3001/api/complaints', { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
    //         .then(response => response.json())
    //         .then(data => { setTableData(data) })

    // }, []);

    function logOut() {
        // console.log(localStorage.getItem("token"));
        localStorage.removeItem("token");
        navigate("/login");
        // console.log(localStorage.getItem("token"));
        //
    }



    const handleStatus = (event) => {
        fetch(`http://localhost:3001/api/complaints/${event}`, { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
            .then(response => response.json())
            .then(data => setTableData(data))
            .catch(error => {
                setTableData([])
            })
    }


    const updateStatus = (event) => {
        // const data = {
        //     complaintStaus: "acknowledged"
        // }
        // fetch(`http://localhost:3001/api/complaints/:${event}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        // })
        //     .then(response => response.json())
        //     .then(result => { console.log(result) })
        //     .catch(error => { console.log("Error Changing the status") })

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
                                <TableCell>Actions</TableCell>
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
                                    <TableCell>
                                        {c.complaintStatus === 'acknowledged' ? (
                                            <>
                                                <Button variant="contained" onClick={() => updateStatus(c._id)}
                                                    sx={{ marginRight: "10px" }}>Reject</Button>
                                                <Button variant="contained" onClick={() => updateStatus(c._id)}>Resolve</Button>
                                            </>
                                        ) : (c.complaintStatus === 'pending' && <Button variant="contained" onClick={() => updateStatus(c._id)}>Acknowledge</Button>
                                        )}
                                    </TableCell>
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
