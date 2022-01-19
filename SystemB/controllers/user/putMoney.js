const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("user/putMoney.hbs");
});

router.post("/", (req, res) => {
  const { balance_value } = req.body;
  console.log(balance_value);
  res.render("user/putMoney.hbs");
});
module.exports = router;
