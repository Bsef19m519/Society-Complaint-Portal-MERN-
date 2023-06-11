import React, { useState } from 'react';
import { Button, Box, Tab } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { TextField } from '@mui/material'
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const ComplaintOfficer = () => {
    let navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [checker, setChecker] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [isAckn, setIsAckn] = useState(true);
    const [isRes, setIsRes] = useState(true);
    const [isRej, setIsRej] = useState(true);
    const [buttonVariant, setButtonVariant] = useState('outlined');





    useEffect(() => {
        fetch(`http://localhost:3001/api/complaints/`, { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
            .then(response => response.json())
            .then(data => setTableData2(data))
            .catch(error => {
                console.log("Got an error")
            })
    }, [])
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
        setIsPending(!isPending);

        const event = "pending"
        fetch(`http://localhost:3001/api/complaints/${event}`, { method: "GET", headers: { "x-auth-token": localStorage.getItem("token") }, })
            .then(response => response.json())
            .then(data => setTableData(data))
            .catch(error => {
                console.log("Got an error")
            })
    }, [])

    const handleMouseEnter = () => {
        setButtonVariant('contained');
    };

    const handleMouseLeave = () => {
        setButtonVariant('outlined');
    };

    const generatePDF = () => {

        let pdfData = []
        // pdfData.push("Complaint Type", "Generation Date", "Acknowledged Date", "Complainer Name", "Complainer Email", "Complaint Status")
        let nestedList = []
        for (var i = 0; i < tableData2.length; i++) {
            const { complaintType, generationDate, acknowledgeDate, complainer, complaintStatus } = tableData2[i];
            nestedList.push(
                complaintType, formateDate(generationDate),
                acknowledgeDate ? formateDate(acknowledgeDate) : "Not Acknowledged Yet",
                complainer.name, complainer.email, complaintStatus
            )
            pdfData.push(nestedList)
            nestedList = []
        }











        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const docDefinition = {
            content: [

            ],
            pageSize: 'A4',
            pageOrientation: 'landscape'
        };



        const tableWidth = 200;
        const first = {
            table:
            {
                headers: 1,
                widths: ["*", "*", "*", "*", "*", "*"],
                body: [
                    ["Complaint Type", "Generation Date", "Acknowledged Date", "Complainer Name", "Complainer Email", "Complaint Status"],
                ]
            }
        }

        docDefinition.content.push(first);



        for (var i = 0; i < pdfData.length; i++) {
            const table = {
                table: {
                    headers: 1,
                    widths: ["*", "*", "*", "*", "*", "*"],
                    body: [
                        pdfData[i]
                    ]

                },
            };


            docDefinition.content.push(table);
        }



        const doc = pdfMake.createPdf(docDefinition);
        doc.download("Complaints Report.pdf")



    }


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
                console.log("Got an error")
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
                <Button sx={{ marginLeft: "40px" }}
                    variant={buttonVariant}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => { generatePDF() }}
                >
                    Generate PDF
                </Button>



            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: 'center' }}>
                <form>
                    <TextField sx={{ width: "300px", height: "auto" }}
                        label="Rejection Reason"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button sx={{ marginLeft: "10px", marginTop: "24px" }} type="submit" variant="contained" color="primary"  >
                        Submit
                    </Button>
                </form>
            </Box> */}

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
                                <TableRow key={c._id}>
                                    <TableCell>{c.complaintType}</TableCell>
                                    <TableCell>{c.description}</TableCell>
                                    <TableCell>{formateDate(c.generationDate)}</TableCell>
                                    {c.complaintStatus === 'pending' ?
                                        <TableCell>Not Acknowledeged Yet</TableCell> : <TableCell>{formateDate(c.acknowledgeDate)}</TableCell>}
                                    <TableCell>{c.complainer.name}</TableCell>
                                    <TableCell>{c.complainer.email}</TableCell>
                                    <TableCell>{c.complaintStatus}</TableCell>

                                    {checker ? (<TableCell>{formateDate(c.finalizeDate)}</TableCell>) : (<TableCell>
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


        </Box >
    );
};
export default ComplaintOfficer;
