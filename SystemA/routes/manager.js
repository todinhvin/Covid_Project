const express = require("express");

const router = express.Router();
router.use("/", function(req, res, next) {
    req.app.locals.layout = "manager";
    next();
});

router.use("/analysis*", function(req, res, next) {
    req.app.locals.layout = "analysis";
    next();
});
router.use("/", require("../controllers/manager/home.C"));
router.use("/patient", require("../controllers/manager/patient.C"));
router.use("/package", require("../controllers/manager/necessity.C"));
router.use("/packages", require("../controllers/manager/packNecs.C"));
router.use("/analysis", require("../controllers/manager/analysis.C"));

module.exports = router;