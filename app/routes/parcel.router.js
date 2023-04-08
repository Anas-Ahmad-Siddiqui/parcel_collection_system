module.exports = app => {
    const parcel = require("../controllers/parcel.controller");

    let router = require("express").Router();

    app.use("/api/parcel", router);

    router.post("/create", parcel.create);

    router.post("/get",parcel.get);
}
