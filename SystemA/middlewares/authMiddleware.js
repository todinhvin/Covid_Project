const jwt = require("jsonwebtoken");

const { getAccount } = require("../models/user/account");

//Check current user
exports.getUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret", async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.account = null;
                next();
            } else {
                //console.log(decodedToken);
                let account = await getAccount("account_id", decodedToken.id);
                //console.log(account);
                res.locals.account = account;
                next();
            }
        });
    } else {
        res.locals.account = null;
        next();
    }
};

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret", async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/auth/login");
            } else {
                //console.log(decodedToken);
                let account = await getAccount("account_id", decodedToken.id);
                req.role = account.role_id;
                req.account_id = account.account_id;
                next();
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};

exports.checkUser = (req, res, next) => {
    const role = req.role;
    if (role == 3 ) {
        next();
    } else {
        res.json("Not Permission");
    }
};

exports.checkManager = (req, res, next) => {
    const role = req.role;
    if (role == 2 ) {
        next();
    } else {
        res.json("Not Permission");
    }
};

exports.checkAdmin = (req, res, next) => {
    const role = req.role;
    if (role == 1) {
        next();
    } else {
        res.json("Not Permission");
    }
};

//Check access
exports.checkAccess = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret", async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/auth/login");
            } else {
                //console.log(decodedToken);
                let account = await getAccount("account_id", decodedToken.id);
                req.role = account.role_id;
                switch (req.role) {
                    case 1:
                        res.redirect('/admin');
                        break;
                    case 2:
                        res.redirect('/manager');
                        break;
                    case 3:
                        res.redirect('/user');
                        break;
                }
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};