const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: 'Trang chủ quản lí'
    });
});

module.exports = router;