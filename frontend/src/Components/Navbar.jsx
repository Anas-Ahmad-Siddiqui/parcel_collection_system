import axios from 'axios';
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    Link,
    MenuItem, Badge, IconButton, Paper
} from "@material-ui/core";
import {useNavigate} from 'react-router-dom';
import {
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import {
    CheckBoxOutlineBlankOutlined,
    DraftsOutlined,
    HomeOutlined,
    InboxOutlined,
    MailOutline,
    ReceiptOutlined,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {Avatar} from "@mui/material";
import React, {useState, useEffect} from "react";
import {Link as RouterLink} from "react-router-dom";

const headersData = [
    {
        label: "Dashboard",
        href: "",
    },
    {
        label: "Edit Profile",
        href: "",
    },
];
const notifications = [
    {
        "name": "Dr. R C Sen",
        "request": "Requesting to access EHR",
    }
];

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    },
}));

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const getList = () => (
        <div style={{width: 250, padding: "2%"}} onClick={() => setOpen(false)}>
            <div style={{fontWeight: "bold", textAlign: "center"}}>Notifications</div>
            {notifications.map((item) => (
                <Paper style={{padding: "5%"}}>
                    <div>{item.name}</div>
                    <div>{item.request}</div>
                    <div>
                        <Button variant="contained" style={{
                            width: "50px",
                            height: "30px",
                            backgroundColor: "green",
                            margin: "2% 5% 0% 0%",
                            fontSize: "12px"
                        }}>Accept</Button>
                        <Button variant="contained" style={{
                            width: "50px",
                            height: "30px",
                            backgroundColor: "red",
                            margin: "2% 5% 0% 0%",
                            fontSize: "12px"
                        }}>Decline</Button>
                    </div>
                </Paper>
            ))}
        </div>
    );
    const {header, logo, menuButton, toolbar, drawerContainer} = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const {mobileView, drawerOpen} = state;
    const username = window.localStorage.getItem('username');
    const [upcoming, setUpcoming] = useState([]);

    const handleAccept = (param) => {
        axios.post("https://core-service.loca.lt/api/appointment/updateRequest", {
            "id": param,
            "request": 2
        })
            .then(res => {
                console.log(res)
            });
        window.location.reload();
    }

    const handleDecline = (param) => {
        axios.post("https://core-service.loca.lt/api/appointment/updateRequest", {
            "id": param,
            "request": 0
        })
            .then(res => {
                console.log(res)
            });
        window.location.reload();
    }
    // useEffect(() => {
    //   axios.post("https://core-service.loca.lt/api/patientAppointment/get",{"patientUsername":username})
    //     .then(
    //         res => {
    //             axios.post("https://core-service.loca.lt/api/appointment/filter",{"appid":res.data.appointmentId})
    //             .then(
    //                 resp => {
    //                   console.log("hello");
    //                     console.log(resp);
    //                     setUpcoming(resp.data);
    //                 }
    //             );
    //         }
    //     )
    // }, []);

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>

                {femmecubatorLogo}
                <Button style={{color: "white", marginRight: "-12%"}} onClick={() => {
                    navigate('/patientAppointDoctor')
                }}>
                    <Typography>Dashboard</Typography>
                </Button>
                <Button style={{color: "white", marginRight: "-12%"}} onClick={() => {
                    navigate('/patientEditProfile')
                }}>
                    <Typography>Edit Profile</Typography>
                </Button>
                <Button style={{color: "white"}} onClick={() => {
                    localStorage.setItem('username', null);
                    navigate('/')
                }}>
                    <Typography>Sign Out</Typography>
                </Button>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({...prevState, drawerOpen: true}));
        const handleDrawerClose = () =>
            setState((prevState) => ({...prevState, drawerOpen: false}));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>{femmecubatorLogo}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({label, href}) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: {textDecoration: "none"},
                        key: label,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };

    const femmecubatorLogo = (
        <>
            <Typography style={{fontFamily:"Arvo, serif", fontWeight: "bolder"}} variant="h6" component="h1" className={logo}>

                {/*<img src="https://cdn-icons-png.flaticon.com/512/4865/4865500.png" style={{height: '30px'}}/>*/}
                Remote Gatekeeping
            </Typography>
        </>

    );


    return (
        <header>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}