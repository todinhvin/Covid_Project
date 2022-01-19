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
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("*", getUser);

router.get("/", checkAccess);

router.use("/auth", authRoute);

router.use("/user", requireAuth, checkUser, userRoute);

// router.use("/user", requireAuth, checkUser, userRoute);
// router.use("/admin", requireAuth, checkAdmin, adminRoute);

module.exports = router;
