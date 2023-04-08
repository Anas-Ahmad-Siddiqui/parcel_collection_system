module.exports = app => {
    const usercode = require("../controllers/usercodes.controller");

    let router = require("express").Router();

    app.use("/api/usercodes", router);

    router.post("/create", usercode.create);

    router.post("/get", usercode.get);

    router.post("/delete", usercode.delete)
};