const express = require("express");

const router = express.Router();

router.use("/patient", require("../controllers/manager/patient.C"));
router.use("/package", require("../controllers/manager/necessity.C"));

module.exports = router;