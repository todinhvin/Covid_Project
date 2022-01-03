const express = require("express");
const managerRoute = require("./manager");

const router = express.Router();

router.use("/manager", managerRoute);
module.exports = router;
