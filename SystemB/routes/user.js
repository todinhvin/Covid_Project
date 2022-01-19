const express = require("express");

const router = express.Router();
router.use("/", function (req, res, next) {
  req.app.locals.layout = "user";
  next();
});
router.use("/", require("../controllers/user/home.js"));
router.use("/put-money", require("../controllers/user/putMoney.js"));

module.exports = router;
