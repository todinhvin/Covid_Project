const express = require("express");
const managerRoute = require("./manager");
const userRoute = require("./user");

const router = express.Router();

router.use("/manager", managerRoute);
router.use("/user", userRoute);

module.exports = router;