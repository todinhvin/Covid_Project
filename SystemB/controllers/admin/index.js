const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getAccount, convertDate, getPaymentHistory } = require("../../models/admin.js");

router.get("/", (req, res, next) => {
    res.render('home');
})

router.get('/account-balance', async (req, res, next) => {
    const adminAccount = await getAccount('role', 1);
    //console.log(adminAccount);

    let accountBal = +adminAccount.account_balance;
    accountBal = accountBal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});

    res.render('admin/accountBalance', {
        accountBal: accountBal,
    });
})

router.get('/payment_history', async (req, res, next) => {
    let phs = await getPaymentHistory();
    
    for (let ph of phs) {
        ph.payment_time = convertDate(ph.payment_time);
    }

    console.log(phs);

    res.render('admin/paymentHistory', {
        payment_historys: phs,
    })
})

module.exports = router;