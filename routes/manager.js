const express = require("express");

const router = express.Router();

router.use("/patient", require("../controllers/manager/patient.C"));

module.exports = router;
