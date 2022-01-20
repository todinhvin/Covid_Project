const jwt = require("jsonwebtoken");

const { getAccount } = require("../models/user/account");

//Check current user
exports.getUser = (req, res, next) => {
    const jwtInfo = req.url.split('/')[2]
    let decodedInfo
    if (jwtInfo && jwtInfo.length > 50) {
        res.locals.jwtRe = jwtInfo
        decodedInfo = jwt.verify(jwtInfo, 'secret');

    }
    if (decodedInfo && decodedInfo.data) {
        res.locals.decodedInfo = decodedInfo.data
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


                next();
            }
        });
    } else {

        res.locals.account = null;
        next();
    }
};

exports.requireAuth = (req, res, next) => {
    console.log(res.locals.decodedInfo)
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
                if (res.locals.decodedInfo) {
                    console.log('ok')
                    res.usernameRed = res.locals.decodedInfo.username;
                    res.jwtRe = res.locals.jwtRe
                }
                next();
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};

exports.checkUser = (req, res, next) => {
    console.log(req.usernameRed, req.jwtRe)
    const role = req.role;
    console.log(role);
    if (role == 3) {
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
                    case 1:
                        res.redirect("/admin");
                        break;
                    case 3:
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
    const account = await getAccount("role", 1);
    if (!account) {
        res.redirect('/auth/signupAdmin');
    }
    next();
};