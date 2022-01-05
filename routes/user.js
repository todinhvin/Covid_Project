const express = require("express");

const router = express.Router();
router.use("/", function (req, res, next) {
  console.log("123213");
  req.app.locals.layout = "user";
  next();
});
router.use("/", require("../controllers/user/user.C"));

module.exports = router;
