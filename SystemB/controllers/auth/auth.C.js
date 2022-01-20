const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getAccount, setPassword, createAdminAccount } = require("../../models/user/account");

const router = express.Router();

const handleErrors = (e) => {
    console.log(e.message, e.code);
    let err = { username: "", password: "" };

    if (e.message === "Incorrect username") {
        err.username = "Incorrect username";
        return err;
    }

    if (e.message === "Incorrect password") {
        err.password = "Incorrect password";
        return err;
    }

    if (e.message === 'Minimum password length is 6 characters') {
        err.password = 'Minimum password length is 6 characters';
        return err;
    }

    if (e.message === "User already login before") {
        err.username = "User already login before";
        return err;
    }

    if (e.message === "Username not in the system") {
        err.username = "Username not in the system";
        return err;
    }

    return err;
};

const maxAge = 3 * 24 * 60 * 60;
const createJWToken = (id) => {
    return jwt.sign({ id }, "secret", {
        expiresIn: maxAge,
    });
};

//[GET] /auth/login
router.get("/login", (req, res, next) => {
    res.render("auth/login");
});

//[POST] /auth/login
router.post("/login", async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const saltRounds = 10;
        //Kiểm tra username
        const account = await getAccount("username", username);
        if (!account) {
            throw Error("Incorrect username");
        } else {
            if (!account.password) {
                const hashPass = await bcrypt.hash(password, saltRounds);
                const data = await setPassword(account.username, hashPass);
            } else {
                //Kiểm tra password
                const auth = await bcrypt.compare(password, account.password);
                if (!auth) {
                    throw Error("Incorrect password");
                }
            }
        }

        //Tạo jwt cho user, lưu vào cookie (đã đăng nhập)
        const token = createJWToken(account.username);
        res.cookie("jwt_payment", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ account: account.role });
    } catch (e) {
        const err = handleErrors(e);
        res.status(400).json(err);
    }
});

//[GET] /auth/logout
router.get("/logout", (req, res, next) => {
    res.cookie("jwt_payment", "", { maxAge: 1 });
    res.redirect("/auth/login");
});

//[GET] /auth/signupAdmin
router.get("/signupAdmin", (req, res, next) => {
    res.render("auth/signupAdmin");
})

//[POST] /auth/signupAdmin
router.post("/signupAdmin", async(req, res, next) => {
    try {
        const { username, password } = req.body;
        if (password.length < 6) {
            throw Error('Minimum password length is 6 characters');
        }

        //Hash password trước khi lưu và DB
        console.log('admin about to be created & saved', username, password);
        const salt = 10;
        const passwordHashed = await bcrypt.hash(password, salt);

        //Lưu user vào DB
        const admin = await createAdminAccount(username, passwordHashed);
        const account = await getAccount('role', 1);
        console.log('admin was created & saved', account);

        //Tạo jwt cho user, lưu vào cookie (đã đăng nhập)
        const token = createJWToken(account.account_id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ account: account.role_id });
    } catch (e) {
        const err = handleErrors(e);
        res.status(400).json(err);
    }
});

//[GET] /auth
router.get("/", (req, res) => {
    res.send("Authentication & Authorization");
});

module.exports = router;