const express = require("express");

const router = express.Router();
router.use("/", function(req, res, next) {
    req.app.locals.layout = "auth";
    next();
});
router.use("/", require("../controllers/auth/auth.C"));

module.exports = router;