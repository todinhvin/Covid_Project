const express = require("express");
const { addAccount, addPaymentHis } = require("../../models/user/account");
const router = express.Router();
router.post('/add-account',async (req,res) => {
    const data = await addAccount(req.body.username)
    if(data) {
        return res.json('success')
    }
    return res.json('error')
})


router.post('/add-payment-his',async (req,res) => {
    const {username,total_money,package_name} = req.body;
    const payment_time = new Date();
    const data = await addPaymentHis({username,total_money,payment_time,package_name})
    if(data) {
        return res.json('success')
    }
    return res.json('error')
})



module.exports = router;


