import {useEffect, useState, useRef} from "react";
import {
    Paper, makeStyles, TextField, Typography, Button,
} from "@material-ui/core";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import AlertDialogSlide from '../Components/prompt'
import Navbar from '../Components/Navbar'
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        height: "75%",
        width: "35%",
        borderRadius: 30,
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "2%",
        border: "2px solid",

    }, heading: {
        display: "flex", marginTop: "10%", color: "#06283D", // fontSize: "100%",
        fontFamily: "Arvo, serif", fontSize: "36px",
    }, grid2: {
        display: "flex", flexDirection: "column", marginTop: "20%", fontFamily: "Arvo, serif", justifyContent: "start"
    },
    details: {
        marginLeft: "12.5%", fontFamily: "Arvo, serif"
    }
}));


const Dashboard = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {height, width} = useWindowDimensions();

    const [codeList, updateCodeList] = useState([]);
    const [dateList, updateDateList] = useState([]);

    const [flat, updateFlat] = useState("");
    const [email, updateEmail] = useState("")

    function createData(i, date, code) {
        return {i, date, code};
    }

    const lists = useRef([
        createData("2022-11-14T17:15:19.000Z", "BA 45 20 4A"),
        createData("2022-11-14T17:15:19.000Z", " BA 45 20 4A"),
        createData("2022-11-14T17:15:19.000Z", "  BA 45 20 4A")
    ])

    useEffect(() => {
        axios.post("http://localhost:8888/api/parcel/get", {
            "username": localStorage.getItem('username')
        }).then(res => {
            updateCodeList(res.data.codes);
            updateDateList(res.data.dates);
            lists.current = [];
            for (let i = 0; i < res.data.codes.length; i++) {
                lists.current.push(createData(i + 1, res.data.dates[i], res.data.codes[i]));
            }
        })

        axios.post("http://localhost:8888/api/user/get", {
            "username": localStorage.getItem('username')
        }).then(res => {
            updateFlat(res.data.flat_no);
            updateEmail(res.data.email);
        })
    }, [])

    return <div><Navbar></Navbar>
        <Paper style={{
            height: height, width: width, backgroundColor: "lightblue", display: "flex", flexDirection: "column",
            // alignItems: "center"
        }}
        >
            <Paper className={classes.details} elevation={0} style={{
                backgroundColor: "lightblue",
                marginTop: "10%"
            }}>Name: {localStorage.getItem('username')}</Paper>
            <Paper className={classes.details} elevation={0}
                   style={{backgroundColor: "lightblue", marginTop: "2%"}}>Email: {email}</Paper>
            <Paper className={classes.details} elevation={0} style={{backgroundColor: "lightblue", marginTop: "2%"}}>Flat
                Number: {flat}</Paper>

            <TableContainer style={{marginTop: "5%", width: "75%", marginLeft: "12.5%"}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{fontFamily:"Arvo, serif", fontWeight:"bold"}} align="left">S.No.</TableCell>
                            <TableCell style={{fontFamily:"Arvo, serif", fontWeight:"bold"}} align={"center"}>RFID Code</TableCell>
                            <TableCell style={{fontFamily:"Arvo, serif", fontWeight:"bold"}} align="right">Date/Time of Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lists.current.map((list) => (
                            <TableRow
                                key={list.code}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell style={{fontFamily:"Arvo, serif"}} align={"left"} component="th" scope="row">
                                    {list.i}
                                </TableCell>
                                <TableCell style={{fontFamily:"Arvo, serif"}} align={"center"} component="th" scope="row">
                                    {list.code}
                                </TableCell>
                                <TableCell style={{fontFamily:"Arvo, serif"}} align="right">{list.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </div>
}

export default Dashboard