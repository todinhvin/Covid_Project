const express = require("express");
const router = express.Router();
const { putMoneyAccount ,} = require("../../models/user/putMoney");
const {changeStateAccount} = require('../../models/user/account')
router.get("/", (req, res) => {
  const { putMoney } = req.query;
  res.render("user/putMoney.hbs", {
    putMoney: putMoney,
  });
});

router.post("/", async (req, res) => {
  const { balance_value } = req.body;
  await changeStateAccount(req.username,'lock');
  const data = await putMoneyAccount(req.username, balance_value);
  await changeStateAccount(req.username,'unlock');
  if (data) {
    return res.render("user/putMoney.hbs?putMoney=success");

  }
    return res.render("user/putMoney.hbs?putMoney=error");
  

});
module.exports = router;
