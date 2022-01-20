const express = require("express");
const router = express.Router();
<<<<<<< HEAD:SystemB/controllers/user/money.js
const { putMoneyAccount ,} = require("../../models/user/money");
const {changeStateAccount, getAccount} = require('../../models/user/account')
=======
const { putMoneyAccount, } = require("../../models/user/putMoney");
const { changeStateAccount, getAccount } = require('../../models/user/account')
>>>>>>> a3572078b1f120ed6dbe5fc225e030fc2fce0be0:SystemB/controllers/user/putMoney.js
router.get("/", (req, res) => {
    const { putMoney } = req.query;
    res.render("user/putMoney.hbs", {
        putMoney: putMoney,
    });
});

<<<<<<< HEAD:SystemB/controllers/user/money.js
router.post("/", async (req, res) => {
  const { balance_value } = req.body;
  await changeStateAccount(req.username,'lock');
  const adminAccount  = await getAccount('role',1)
  const userAccount  = await getAccount('username',req.username)
  const data = await putMoneyAccount(req.username, +userAccount.account_balance + (+balance_value));
  const data1 = await putMoneyAccount(adminAccount.username,+adminAccount.account_balance + (+balance_value));
  await changeStateAccount(req.username,'unlock');
  if (data &&data1) {
    return res.redirect("/user/put-money?putMoney=success");
=======
router.post("/", async(req, res) => {
    const { balance_value } = req.body;
    await changeStateAccount(req.username, 'lock');
    const adminAccount = await getAccount('role', 1);
    const userAccount = await getAccount('username', req.username)
    const data = await putMoneyAccount(req.username, +userAccount.account_balance + (+balance_value));
    const data1 = await putMoneyAccount(adminAccount.username, +adminAccount.account_balance + (+balance_value));
    await changeStateAccount(req.username, 'unlock');
    if (data && data1) {
        return res.redirect("/user/put-money?putMoney=success");
>>>>>>> a3572078b1f120ed6dbe5fc225e030fc2fce0be0:SystemB/controllers/user/putMoney.js

    }
    return res.redirect("/user/put-money?putMoney=error");


});
module.exports = router;