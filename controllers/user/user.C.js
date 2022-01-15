const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const { allUser, getOneUser } = require("../../models/user/user");
const { getStatusHistory } = require("../../models/user/statusHistory");
const { getTreatmentHistory } = require("../../models/user/treatmentHistory");
const { getAccount, changeAccount } = require("../../models/user/account");
const { getCheckout } = require("../../models/user/checkout");
const { getIndept } = require("../../models/user/indept");
const { getPaymentHistory } = require("../../models/user/paymentHistory");
const { getAddress } = require("../../models/user/address");
const { getTreatment } = require("../../models/user/treatment");

const { convertDate } = require("../../helper");

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

    checkouts.forEach((checkout) => {
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

    indepts.forEach(indept => {
        indept.due_date = convertDate(indept.due_date);
    })

    console.log(indepts);

    res.render("user/indept", {
        indepts: indepts,
    });
});

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

module.exports = router;