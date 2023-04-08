require("dotenv").config();
const axios = require("axios")
const express = require("express");
const nodemailer = require('nodemailer');
const {SerialPort} = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const cors = require("cors");

const {CourierClient} = require("@trycourier/courier")


const courier = CourierClient({authorizationToken: "pk_prod_TCSWY8HXCK47VGMXCYSXNSW3Y2DH"});

const app = express();

let corsOptions = {
    origin: ["*"]
};

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const onDelivery = (email, name) => {
    courier.send({
        message: {
            to: {
                email: email,
            },
            template: "CEJX1KB3FDM8XHPSSPAD8S1YMGGC",
            data: {
                recipientName: name,
            },
        },
    }).catch((error) => {
        console.error(error)
    });
}

const onTakingOut = (email, name) => {
    courier.send({
        message: {
            to: {
                email: email,
            },
            template: "ZSD4RNNBNK41R2PC4CK5D0HJ6MQA",
            data: {
                recipientName: name,
            },
        },
    }).catch((error) => {
        console.error(error)
    });
}

var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

const db = require("./app/models");

console.log(db.url);

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require("./app/routes/user.routes")(app);
require("./app/routes/usercodes.routes")(app);
require("./app/routes/parcel.router")(app);

app.get('/', (req, res) => {
    res.send("Welcome to auth-test!");
});

let portName = "COM10";

const port = new SerialPort({path: portName, baudRate: 9600})

const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}))

parser.on('data', onData)

var UserName = "";

function onData(data) {
    if (data.charAt(0) == 'u') {
        UserName = data.split(" ")[1];
        console.log(UserName);
    } else {

        var currentdate = new Date();
        var nameCode = {
            username: UserName,
            code: data
        }

        axios.post("http://localhost:8888/api/usercodes/create", nameCode).then(res => {
            if (res.status == 200) {
                console.log("Condition 1")
                axios.post("http://localhost:8888/api/parcel/create", {
                    username: UserName,
                    dates: [currentdate],
                    codes: [data]
                }).then(res => {
                    axios.post("http://localhost:8888/api/user/get", {
                        username: UserName
                    }).then(res => {
                        onDelivery(res.data.email, res.data.name);
                    })
                });
            } else {
                UserName = res.data.message;
                console.log("Condition 2")
                console.log(UserName)
                axios.post("http://localhost:8888/api/usercodes/delete", nameCode).then(res => {
                    console.log("usercode deleted");
                    axios.post("http://localhost:8888/api/parcel/create", {
                        username: UserName,
                        dates: [currentdate],
                        codes: [data]
                    }).then(res => {
                        axios.post("http://localhost:8888/api/user/get", {
                            username: UserName
                        }).then(res => {
                            onTakingOut(res.data.email, res.data.name);
                        })
                        console.log("Parcel deleted");
                    }).catch(e => {
                        console.log(e)
                    })
                })
            }
        })
    }
}
