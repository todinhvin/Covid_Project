const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const { allUser, getOneUser } = require("../../models/user/user");
const { getStatusHistory } = require("../../models/user/statusHistory");
const { getTreatmentHistory } = require("../../models/user/treatmentHistory");
const { getAccount, changeAccount,getPatientByCCCD } = require("../../models/user/account");
const { getCheckout, createCheckout } = require("../../models/user/checkout");
const { getIndept, getTotalIndebt,changeStateIndept } = require("../../models/user/indept");
const { getPaymentHistory ,createPaymentHistory } = require("../../models/user/paymentHistory");
const { getAddress } = require("../../models/user/address");
const { getTreatment } = require("../../models/user/treatment");
const { getAllPackage, getPackageById, getPackageDetail } = require('../../models/user/buy')

const { convertDate } = require("../../helper");
const { json } = require("express/lib/response");

//[GET] /user/profile
router.get("/profile", async(req, res) => {
    let account;
    const token = req.cookies.jwt;
    await jwt.verify(token, "secret", async(err, decodedToken) => {
        //console.log(decodedToken);
        account = await getAccount("account_id", decodedToken.id);
    });

    const user = await getOneUser("person_id", account.person_id);
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
    const treatment_historys = await getTreatmentHistory(
        "person_id",
        req.params.id
    );

    status_historys.forEach((_status) => {
        _status.time = convertDate(_status.time);
    });

    treatment_historys.forEach((treatment) => {
        treatment.time = convertDate(treatment.time);
    });

    res.render("user/manageHistory", {
        status_historys: status_historys,
        treatment_historys: treatment_historys,
    });
});

//[GET] /user/packageHistory/:id
router.get("/packageHistory/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const checkouts = await getCheckout("account_id", account.account_id);

    await checkouts.forEach((checkout) => {
        checkout.checkout_date = convertDate(checkout.checkout_date);
    });

    res.render("user/packageHistory", {
        checkouts: checkouts,
    });
});

//[GET] /user/indept/:id
router.get("/indept/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const indepts = await getIndept("account_id", account.account_id);

    let price = await getTotalIndebt("account_id", account.account_id);

    indepts.forEach(indept => {
        indept.due_date = convertDate(indept.due_date);
    })
    console.log(indepts)

    //console.log(indepts);

    res.render("user/indept", {
        indepts: indepts,
        price: price,
    });
});

router.get('/payment/:id', async (req,res) => {
    const {id} = req.params;
    const indeptArr = await getIndept("indept_id", id);
    const indept = indeptArr.length>0 ?indeptArr[0]:undefined
    let account, user
    if(indept) {
        account = await getAccount("account_id", indept.account_id);
        if(account) {
            user = await getOneUser("person_id", account.person_id);
        }
    }

    if(!user.cccd) {
        return res.redirect('home?payment=error')
    }

    const key="123"
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: { indept_id: indept.indept_id,indept:indept.indept,account_id:indept.account_id,username:user.cccd }
    }, 'secret');
    res.redirect(`http://127.0.0.1:4000/user/${token}`)
})

router.get('/payment/response',async (req,res)=> {
    const {indept_id,payment_on,indept,cccd} =req.body;
    const patient = await getPatientByCCCD(cccd);
    const account = getAccount('person_id',patient.person_id)
    const data = await changeStateIndept(indept_id,'true');
    const data1 = await createPaymentHistory(account.account_id,payment_on,indept)
    if(data &&data1) {
        return res.json('success')
    }else return res.json('error')
})

//[GET] /user/paymentHistory/:id
router.get("/paymentHistory/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const payment_historys = await getPaymentHistory("account_id", account.account_id);

    payment_historys.forEach((payment) => {
        payment.payment_on = convertDate(payment.payment_on);
    });

    res.render("user/paymentHistory", {
        payment_historys: payment_historys,
    });
});

//[GET] /user/paymentNotice/:id
router.get("/paymentNotice/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    const indepts = await getIndept("account_id", account.account_id);

    indepts.forEach(indept => {
        indept.due_date = convertDate(indept.due_date);
    })

    console.log(indepts);

    res.render("user/indept", {
        indepts: indepts,
    });
});

//[GET] /user/changePassword/:id
router.get("/changePassword/:id", async(req, res) => {
    const account = await getAccount("person_id", req.params.id);
    res.render("user/changePassword", {
        account_id: account.account_id,
    });
});

const handleErrors = (e) => {
    console.log(e.message, e.code);
    let err = { password: "", new_password: "", confirm_password: "" };

    if (e.message === "Incorrect password") {
        err.password = "Incorrect password";
        return err;
    }

    if (e.message === "Incorrect confirm password") {
        err.confirm_password = "Incorrect confirm password";
        return err;
    }

    return err;
};

//[PUT] /user/changePassword/:id
router.put("/changePassword/:id", async(req, res) => {
    try {
        const account = await getAccount("person_id", req.params.id);
        const { password, new_password, confirm_password } = req.body;
        //Kiểm tra password
        const auth = await bcrypt.compare(password, account.password);
        if (!auth) {
            throw Error("Incorrect password");
        }
        //Kiểm tra new password
        if (new_password != confirm_password) {
            throw Error("Incorrect confirm password");
        }

        //Cập nhật password to db
        const saltRounds = 10;
        const passwordHashed = await bcrypt.hash(new_password, saltRounds);
        const after_change = await changeAccount('account_id', account.account_id, 'password', passwordHashed);

        //Đăng xuất user, yêu cầu đăng nhập lại sau khi đổi password
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ account: account.role_id });
    } catch (e) {
        const err = handleErrors(e);
        res.status(400).json(err);
    }
})

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
      Id: tempid,
      Items: its,
      countItems: count,
  });
})


//[POST] /buy
router.post('/buy/:id/detail', async(req, res) => {
    // Lấy account id
    const token = req.cookies.jwt;
    let account;
    await jwt.verify(token, "secret", async(err, decodedToken) => {
        account = await getAccount("account_id", decodedToken.id);
    });
    let uid = account.account_id;

    // Lấy package id
    let pid = req.params.id;
    
    // Đọc dữ liệu từ form
    uqObject = req.body;
    uqArray = Object.entries(uqObject);
    inputTest = []
    for (let [tid, tq] of uqArray) {
        inputTemp = {
            item_id: tid,
            uquantity: tq,
        }

        inputTest.push(inputTemp)
    }

    // Lấy package detail để thay thế số lượng người dùng nhập vào
    //và thuận tiện cho việc tạo checkout
    let its = await getPackageDetail(pid);
    for (let i = 0; i < its.length; i++) {
        its[i].quantity = inputTest[i].uquantity;
    }

    // Tạo checkout
    let createRes = await createCheckout(uid, pid, its);

    // Lấy lại thông tin trang detail để render
    let pd = await getPackageById(pid);
    let tempPrice = 0;
    for (let it of its) {
        tempPrice += it.quantity * it.price;
    }
    let count = its.length;

    res.render('user/buy/buyDetail', {
        name: pd.name,
        price: tempPrice,
        Id: pid,
        Items: its,
        countItems: count,
        result: createRes,
    });
  })

//[GET] /user/indept
router.get("/indept", async(req, res) => {
    let account;
    const token = req.cookies.jwt;
    await jwt.verify(token, "secret", async(err, decodedToken) => {
        //console.log(decodedToken);
        account = await getAccount("account_id", decodedToken.id);
    });
    const indepts = await getIndept("account_id", account.account_id);
    let price = await getTotalIndebt("account_id", account.account_id);
    
    indepts.forEach(indept => {
        indept.due_date = convertDate(indept.due_date);
    })

    //console.log(indepts);

    res.render("user/indept", {
        indepts: indepts,
        price: price,
    });
});

module.exports = router;
