const express = require("express");
const { getAccount } = require("../models/user/account");
const { getPatientByCCCD } = require("../models/user/account");
const { changeStateIndept } = require("../models/user/indept");
const { createPaymentHistory } = require("../models/user/paymentHistory");
const router = express.Router();

router.post('/payment/response',async (req,res)=> {
    const {indept_id,payment_on,indept,cccd} =req.body;
    const patient = await getPatientByCCCD(cccd);
    console.log(patient.person_id)
    const account =await  getAccount('person_id',patient.person_id)
    const data = await changeStateIndept(indept_id,'true');
    const data1 = await createPaymentHistory(account.account_id,payment_on,indept)
    if(data &&data1) {
        return res.json('success')
    }else return res.json('error')
})

router.get('/',(req,res)=> {
    res.json("Ok")
})

module.exports = router;
