const express = require("express");
const authRoute = require("./auth");
const managerRoute = require("./manager");
const userRoute = require("./user");

const { getUser, requireAuth, checkUser, checkManager, checkAdmin, checkAccess } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('*', getUser);

router.get("/", checkAccess);

router.use("/auth", authRoute);

router.use("/manager", requireAuth, checkManager, managerRoute);
router.use("/user", requireAuth, checkUser, userRoute);

module.exports = router;