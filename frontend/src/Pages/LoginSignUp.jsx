import {useEffect, useState, useRef} from "react";
import {
    Paper, makeStyles, TextField, Typography, Button,
} from "@material-ui/core";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import AlertDialogSlide from '../Components/prompt'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        height: "75%",
        width: "35%",
        borderRadius: 30, // justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "2%",
        border: "2px solid",

    }, heading: {
        display: "flex", marginTop: "10%", color: "#06283D", // fontSize: "100%",
        fontFamily: "Arvo, serif", fontSize: "36px",
    },
}));

const LoginSignUp = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const {height, width} = useWindowDimensions();

    const [loginToken, setLoginToken] = useState("");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signUsername, setSignUsername] = useState("");
    const [signName, setSignName] = useState("");
    const [signPassword, setSignPassword] = useState("");
    const [signFlat, setSignFlat] = useState("");
    const [signEmail, setSignEmail] = useState("")

    const [lUserError, setlUserError] = useState(false);
    const [lPassError, setlPassError] = useState(false);
    const [sUserError, setsUserError] = useState(false);
    const [sNameError, setsNameError] = useState(false);
    const [sPassError, setsPassError] = useState(false);

    const [open, setDialogOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alert, setDialogAlert] = useState("");

    const handleLoginUsername = (e) => {
        if (lUserError == true && e.length > 0) {
            setlUserError(false);
        }
        setLoginUsername(e);
    };

    const handleLoginPassword = (e) => {
        if (lPassError == true && e.length > 0) {
            setlPassError(false);
        }
        setLoginPassword(e);
    };

    const handleSignName = (e) => {
        if (sNameError == true && e.length > 0) {
            setsNameError(false);
        }
        setSignName(e);
    };

    const handleSignPassword = (e) => {
        if (sPassError == true && e.length > 0) {
            setsPassError(false);
        }
        setSignPassword(e);
    };

    const handleSignUsername = (e) => {
        if (sUserError == true && e.length > 0) {
            setsUserError(false);
        }
        setSignUsername(e);
    };

    const handleSignEmail = (e) => {
        setSignEmail(e);
    }

    const handleSignFlat = (e) => {
        setSignFlat(e);
    }

    const LoginButton = () => {
        if (loginUsername.length == 0) {
            console.log("Here");
            setlUserError(true);
            return;
        }
        if (loginPassword.length == 0) {
            setlPassError(true);
            return;
        }
        axios({
            method: "POST", url: "http://localhost:8888/api/user/signin", data: {
                "username": loginUsername, "password": loginPassword
            }
        }).then((res) => {

            if (res.status != 200) {
                setLoginPassword("")
                setDialogOpen(true)
                setAlertTitle("Your credentials did not work")
                setDialogAlert("Either your username or password is incorrect")
            } else {
                window.localStorage.setItem("username", loginUsername);
                navigate('/dashboard')
            }
        });
    };

    const signButton = () => {
        if (signName.length == 0) {
            setsNameError(true);
            return;
        }
        if (signUsername.length == 0) {
            setsUserError(true);
            return;
        }
        if (signPassword.length == 0) {
            setsPassError(true);
            return;
        }

        axios({
            method: "POST", url: "http://localhost:8888/api/user/signup", data: {
                "username": signUsername, "password": signPassword, "name": signName, "email": signEmail, "flat_no": signFlat
            }
        }).then((resp) => {
            if (resp.status == 200) {
                localStorage.setItem('username', signUsername);
                navigate('/dashboard')
            } else {
                setSignPassword("")
                setDialogOpen(true)
                setAlertTitle("Sorry, that username already exists")
                setDialogAlert("An account with this username already exists")
            }
        })
    };

    return <div
        style={{
            height: height,
            width: width,
            backgroundColor: "lightblue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <AlertDialogSlide setOpen={setDialogOpen} open={open} alertTitle={alertTitle}
                          alert={alert}></AlertDialogSlide>
        <Paper className={classes.paper} elevation={20}>
            <Typography className={classes.heading}>LOGIN</Typography>
            <TextField
                error={lUserError}
                id="login-username"
                label="Username"
                variant="standard"
                style={{
                    display: "flex", marginTop: "20%", justifySelf: "center", width: "50%",
                }}
                value={loginUsername}
                onChange={(e) => {
                    handleLoginUsername(e.target.value);
                }}
            />
            <TextField
                id="login-password"
                label="Password"
                error={lPassError}
                variant="standard"
                type="password"
                style={{
                    display: "flex", marginTop: "15%", justifySelf: "center", width: "50%",
                }}
                value={loginPassword}
                onChange={(e) => {
                    handleLoginPassword(e.target.value);
                }}
            />
            <Button
                variant="outlined"
                style={{
                    marginTop: "15%",
                    width: "30%",
                    height: "7.5%",
                    borderRadius: "25px",
                    fontSize: "125%",
                    fontFamily: "Arvo",
                    backgroundColor: "#256D85",
                    color: "#DFF6FF"
                }}
                onClick={LoginButton}
            >
                LOGIN
            </Button>
        </Paper>
        <Paper className={classes.paper} style={{marginLeft: "-1%"}} elevation={20}>
            <Typography className={classes.heading}>SIGN UP</Typography>
            <TextField
                id="sign-name"
                label="Name"
                variant="standard"
                error={sNameError}
                style={{
                    display: "flex", marginTop: "15%", justifySelf: "center", width: "50%",
                }}
                value={signName}
                onChange={(e) => {
                    handleSignName(e.target.value);
                }}
            />
            <TextField
                id="sign-username"
                label="Username"
                variant="standard"
                error={sUserError}
                style={{
                    display: "flex", marginTop: "4%", justifySelf: "center", width: "50%",
                }}
                value={signUsername}
                onChange={(e) => {
                    handleSignUsername(e.target.value);
                }}
            />
            <TextField
                id="sign-password"
                label="Password"
                variant="standard"
                type="password"
                error={sPassError}
                style={{
                    display: "flex", marginTop: "4%", justifySelf: "center", width: "50%",
                }}
                value={signPassword}
                onChange={(e) => {
                    handleSignPassword(e.target.value);
                }}
            />
            <TextField
                id="sign-email"
                label="Email"
                variant="standard"
                // error={sEmailError}
                style={{
                    display: "flex", marginTop: "4%", justifySelf: "center", width: "50%",
                }}
                value={signEmail}
                onChange={(e) => {
                    handleSignEmail(e.target.value);
                }}
            />
            <TextField
                id="sign-flat"
                label="Flat No."
                variant="standard"
                // error={sUserError}
                style={{
                    display: "flex", marginTop: "4%", justifySelf: "center", width: "50%",
                }}
                value={signFlat}
                onChange={(e) => {
                    handleSignFlat(e.target.value);
                }}
            />

            <Button
                variant="outlined"
                style={{
                    marginTop: "15%",
                    width: "30%",
                    height: "7.5%",
                    borderRadius: "25px",
                    fontSize: "125%",
                    fontFamily: "Arvo",
                    backgroundColor: "#256D85",
                    color: "#DFF6FF"
                }}
                onClick={signButton}
            >
                SIGN UP
            </Button>

        </Paper>
    </div>;
};

export default LoginSignUp;
