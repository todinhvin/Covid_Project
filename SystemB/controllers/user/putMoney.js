const express = require("express");
const router = express.Router();
const { putMoneyAccount, } = require("../../models/user/putMoney");
const { changeStateAccount, getAccount } = require('../../models/user/account')
router.get("/", (req, res) => {
    const { putMoney } = req.query;
    res.render("user/putMoney.hbs", {
        putMoney: putMoney,
    });
});

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

    }
    return res.redirect("/user/put-money?putMoney=error");


});
module.exports = router;