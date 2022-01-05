const express = require("express");

const router = express.Router();
router.use("/", function (req, res, next) {
  req.app.locals.layout = "admin";
  next();
});
router.use("/patient", require("../controllers/manager/patient.C"));

module.exports = router;
