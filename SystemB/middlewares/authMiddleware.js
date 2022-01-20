const jwt = require("jsonwebtoken");

const { getAccount } = require("../models/user/account");

//Check current user
exports.getUser = (req, res, next) => {
    const jwtInfo = req.url.split('/')[2]
    let  decodedInfo
    if(jwtInfo && jwtInfo.length>50) {
        decodedInfo = jwt.verify(jwtInfo, 'secret');

    }
    if(decodedInfo) {
        req.decodedInfo = decodedInfo
    }
    const token = req.cookies.jwt_payment;
    if (token) {
        jwt.verify(token, "secret", async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.account = null;
                next();
            } else {
                //console.log(decodedToken);
                let account = await getAccount("username", decodedToken.id);
                if (!account) {
                    res.locals.account = null;
                } else {
                    res.locals.account = account;
                }
                res.locals.username_correct = decodedInfo.username

                next();
            }
        });
    } else {
        res.locals.username_correct = decodedInfo.username
        res.locals.account = null;
        next();
    }
};

exports.requireAuth = (req, res, next) => {
    console.log(req.locals.username_correct)
    const token = req.cookies.jwt_payment;
    if (token) {
        jwt.verify(token, "secret", async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/auth/login");
            } else {
                //console.log(decodedToken);
                let account = await getAccount("username", decodedToken.id);
                if (!account) {
                    res.clearCookie("jwt_payment");
                    return res.redirect("/auth/login");
                }
                req.role = account.role;
                req.username = account.username;
                next();
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};

exports.checkUser = (req, res, next) => {
    const role = req.role;
    console.log(role);
    if (role == "user" || role == "admin") {
        next();
    } else {
        res.json("Not Permission");
    }
};

exports.checkAdmin = (req, res, next) => {
    const role = req.role;
    if (role == "admin") {
        next();
    } else {
        res.json("Not Permission");
    }
};

//Check access
exports.checkAccess = (req, res, next) => {
    const token = req.cookies.jwt_payment;
    if (token) {
        jwt.verify(token, "secret", async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/auth/login");
            } else {
                //console.log(decodedToken);
                let account = await getAccount("username", decodedToken.id);
                req.role = account.role;
                switch (req.role) {
                    case "admin":
                        res.redirect("/admin");
                        break;
                    case "user":
                        res.redirect("/user");
                        break;
                }
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};

//Check first access
exports.checkFirstAccess = async(req, res, next) => {
    const account = await getAccount("role", "admin");
    if (!account) {
        res.redirect('/auth/signupAdmin');
    }
    next();
};