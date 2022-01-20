const express = require("express");

const router = express.Router();
router.use("/", function(req, res, next) {
    req.app.locals.layout = "admin";
    next();
});

router.use("/", require("../controllers/admin/index"));

module.exports = router;