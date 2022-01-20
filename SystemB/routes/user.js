const express = require("express");
const { getAccount } = require("../models/user/account.js");

const router = express.Router();
router.use("/", function (req, res, next) {
  req.app.locals.layout = "user";
  next();
});

const checkLockAccount = async (req, res, next) => {
  const username = req.username;
  const account = await getAccount("username", username);
  console.log(account);
  if (account.state === "lock") {
    return res.redirect("/user?state=lock");
  }
  next();
};
router.use(
  "/put-money",
  checkLockAccount,
  require("../controllers/user/money.js")
);
router.use(
  "/account-balance",
  require("../controllers/user/accountBalance.js")
);
router.use("/", require("../controllers/user/home.js"));

module.exports = router;
