const express = require("express");
const authRoute = require("./auth");
const userRoute = require("./user");
const adminRoute = require("./admin");

const {
    getUser,
    requireAuth,
    checkUser,
    checkManager,
    checkAdmin,
    checkAccess,
    checkFirstAccess,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("*", getUser);

router.get("/", checkFirstAccess);
router.get("/", checkAccess);

router.use("/auth", authRoute);

router.use("/api", require("../controllers/api/account.js"));

router.use("/user", requireAuth, checkUser, userRoute);

router.use("/admin", requireAuth, checkAdmin, adminRoute);

module.exports = router;