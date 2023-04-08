const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.parcel = require("./parcel.model")(mongoose);
db.usercode = require("./usercodes.model")(mongoose);

module.exports = db;