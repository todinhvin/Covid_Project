const express = require("express");
const router = express.Router();
const { putMoneyAccount } = require("../../models/user/putMoney");
router.get("/", (req, res) => {
  const { putMoney } = req.query;
  console.log(putMoney);
  res.render("user/putMoney.hbs", {
    putMoney: putMoney,
  });
});

router.post("/", async (req, res) => {
  const { balance_value } = req.body;
  const data = await putMoneyAccount(req.username, balance_value);
  if (data) {
    return res.redirect("/");
  }
  res.render("user/putMoney.hbs?putMoney=success");
});
module.exports = router;
