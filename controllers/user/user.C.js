const express = require("express");
const router = express.Router();

const { allUser, getOneUser, } = require("../../models/user/user");
const { getStatusHistory, } = require("../../models/user/statusHistory");
const { getTreatmentHistory, } = require("../../models/user/treatmentHistory");
const { getAccount, } = require("../../models/user/account");
const { getCheckout, } = require("../../models/user/checkout");
const { getIndept, } = require("../../models/user/indept");
const { getPaymentHistory, } = require("../../models/user/paymentHistory");
const { getAddress, } = require("../../models/user/address");
const { getTreatment, } = require("../../models/user/treatment");

const { convertDate } = require("../../helper");

//[GET] /user/profile
router.get("/profile", async(req, res) => {
    const user = await getOneUser('person_id', '2');
    const address = await getAddress('address_id', user.address_id);
    const treatment = await getTreatment('treatment_id', user.treatment_id);

    res.render('user/profile', {
        user: user,
        address: address,
        treatment: treatment,
    });
});

//[GET] /user/manageHistory/:id
router.get('/manageHistory/:id', async(req, res) => {
    const status_historys = await getStatusHistory('person_id', req.params.id);
    const treatment_historys = await getTreatmentHistory('person_id', req.params.id);

    res.render('user/manageHistory', {
        status_historys: status_historys,
        treatment_historys: treatment_historys,
    });
});

//[GET] /user/packageHistory/:id
router.get('/packageHistory/:id', async(req, res) => {
    const account = await getAccount('person_id', req.params.id);
    const checkouts = await getCheckout('account_id', account.account_id);

    res.render('user/packageHistory', {
        checkouts: checkouts,
    });
});

//[GET] /user/indept/:id
router.get('/indept/:id', async(req, res) => {
    const account = await getAccount('person_id', req.params.id);
    const indept = await getIndept('indept_id', account.indebt_id);

    res.render('user/indept', {
        indept: indept,
    });
});

//[GET] /user/paymentHistory/:id
router.get('/paymentHistory/:id', async(req, res) => {
    const account = await getAccount('person_id', req.params.id);
    const payment_historys = await getPaymentHistory('account_id', account.account_id);

    res.render('user/paymentHistory', {
        payment_historys: payment_historys,
    });
});

//[GET] /user/paymentNotice/:id
router.get('/paymentNotice/:id', async(req, res) => {
    const account = await getAccount('person_id', req.params.id);
    const payment_historys = await getPaymentHistory('account_id', account.account_id);

    res.render('user/paymentHistory', {
        payment_historys: payment_historys,
    });
});

//[GET] /user
router.get('/', (req, res) => {
    res.render("homeUser");
})

module.exports = router;