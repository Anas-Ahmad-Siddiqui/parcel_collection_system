module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    let router = require("express").Router();

    app.use("/api/user", router);

    router.get("/", user.findAll);

    router.post("/signup", user.create);

    router.post("/update", user.update);

    router.post("/signin", user.signin);

    router.post("/signout", user.signOut);

    router.post("/get", user.get);
  };