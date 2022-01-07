const express = require("express");
const router = express.Router();

const { allUser, getOneUser } = require("../../models/user/user");
const { getStatusHistory } = require("../../models/user/statusHistory");
const { getTreatmentHistory } = require("../../models/user/treatmentHistory");
const { getAccount } = require("../../models/user/account");
const { getCheckout } = require("../../models/user/checkout");
const { getIndept } = require("../../models/user/indept");
const { getPaymentHistory } = require("../../models/user/paymentHistory");
const { getAddress } = require("../../models/user/address");
const { getTreatment } = require("../../models/user/treatment");
const { getAllPackage, getPackageById, getPackageDetail } = require('../../models/user/buy')

const { convertDate } = require("../../helper");

//[GET] /user/profile
router.get("/profile", async(req, res) => {
    const user = await getOneUser("person_id", "2");
    user.birthday = convertDate(user.birthday);
    const address = await getAddress("address_id", user.address_id);
    const treatment = await getTreatment("treatment_id", user.treatment_id);

    res.render("user/profile", {
        user: user,
        address: address,
        treatment: treatment,
    });
});

//[GET] /user/manageHistory/:id
router.get("/manageHistory/:id", async(req, res) => {
    const status_historys = await getStatusHistory("person_id", req.params.id);
    const treatment_historys = await getTreatmentHistory("person_id", req.params.id);

    status_historys.forEach(_status => {
        _status.time = convertDate(_status.time);
    })

    treatment_historys.forEach(treatment => {
        treatment.time = convertDate(treatment.time);
    })

    res.render("user/manageHistory", {
        status_historys: status_historys,
        treatment_historys: treatment_historys,
    });
});

//[GET] /user/packageHistory/:id
router.get("/packageHistory/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const checkouts = await getCheckout("account_id", account.account_id);

    checkouts.forEach(checkout => {
        checkout.checkout_date = convertDate(checkout.checkout_date);
    });

    res.render("user/packageHistory", {
        checkouts: checkouts,
    });
});

//[GET] /user/indept/:id
router.get("/indept/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const indept = await getIndept("indept_id", account.indebt_id);

    indept.due_date = convertDate(indept.due_date);

    res.render("user/indept", {
        indept: indept,
    });
});

//[GET] /user/paymentHistory/:id
router.get("/paymentHistory/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const payment_historys = await getPaymentHistory("account_id", account.account_id);

    payment_historys.forEach(payment => {
        payment.payment_on = convertDate(payment.payment_on);
    })

    res.render("user/paymentHistory", {
        payment_historys: payment_historys,
    });
});

//[GET] /user/paymentNotice/:id
router.get("/paymentNotice/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const indept = await getIndept("indept_id", account.indebt_id);

    indept.due_date = convertDate(indept.due_date);

    res.render("user/indept", {
        indept: indept,
    });
});

//[GET] /user
router.get("/", (req, res) => {
    res.render("homeUser", {
        account: res.locals.account,
    });
});

//[GET] /buy
router.get('/buy', async(req, res) => {
  const { page = 1, filter, search } = req.query;
  //console.log("filter = ", filter, " search = ", search);

  const { totalPage, Packages } = await getAllPackage({ page, filter, search });

  res.render('user/buy/buyList', {
      Packages: Packages,
      totalPage,
      page,
      filter,
      search,
  });
})

/*
//[GET] /buy
router.get('/buy', async(req, res) => {
  let pds = await getAllPackage();
  res.render('user/buy/buyList', {
      Packages: pds,
  });
})
*/

//[GET] /buy/:id/detail
router.get('/buy/:id/detail', async(req, res) => {
  let tempid = req.params.id;
  let pd = await getPackageById(tempid);

  let its = await getPackageDetail(tempid);
  
  let count = its.length;

  res.render('user/buy/buyDetail', {
      name: pd.name,
      price: pd.price,
      Items: its,
      countItems: count,
  });
})


module.exports = router;
