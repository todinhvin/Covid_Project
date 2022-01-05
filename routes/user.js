const express = require("express");

const router = express.Router();

router.use("/", require("../controllers/user/user.C"));

module.exports = router;