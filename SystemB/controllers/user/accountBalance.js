const express = require("express");
const router = express.Router();
const { putMoneyAccount ,} = require("../../models/user/putMoney");
const {changeStateAccount, getAccount} = require('../../models/user/account')
router.get("/",async (req, res) => {
  const account = await getAccount('username',req.username);
  console.log(account)
  let accountBal = +account.account_balance
  accountBal = accountBal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  res.render("user/accountBalance.hbs",{
    accountBal: accountBal
  });
});

module.exports = router;
