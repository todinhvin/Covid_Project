const express = require("express");
const jwt = require("jsonwebtoken");
const { addPaymentHis, getAccount } = require("../../models/user/account");
const { putOutMoneyAccount } = require("../../models/user/money");
const { responsePaymentA } = require("../api/responseA");

const router = express.Router();

router.post('/payment_indept', async(req, res) => {
    const { data } = req.body
    const dataParse = JSON.parse(data);
    console.log(dataParse)
    const account = await getAccount("username", dataParse.username)
    const data1 = await putOutMoneyAccount(dataParse.username, dataParse.indept);
    const payment_time = new Date();
    let data2;
    if (data1) {
        data2 = await addPaymentHis(account.account_id, dataParse.indept, payment_time);
    }
    if (data1 && data2) {
        const { indept_id, indept, username } = dataParse;
        const payment_on = new Date();
        const data3 = await responsePaymentA({ indept_id, indept, cccd: username, payment_on })
            // console.log(data3)

        return res.redirect('/user/?status=success');

    }
    return res.redirect('/user/?status=error')
})

router.get("/:info", (req, res) => {
    try {
        const { info } = req.params;
        var decoded = jwt.verify(info, 'secret');
        // res.clearCookie("data_req");

        if (req.username != decoded.data.username) {
            return res.redirect('/user')
        }
        let indebt = decoded.data.indept.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        res.render("user/payment", { indept: indebt, data: JSON.stringify(decoded.data) });

    } catch (err) {
        console.log(err)
    }
})



router.get("/", (req, res) => {
    const { state, status } = req.query;
    res.render("homeUser", {
        state: state ? state : '',
        status,
    });
});





module.exports = router;