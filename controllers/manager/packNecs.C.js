const express = require("express");
const { get } = require("express/lib/response");
const { getAllPackage } = require("../../models/manager/package")
const router = express.Router();



router.get('/', async(req, res) => {

    const data = await getAllPackage();
    res.render('manager/packageNecs/packNecs', {
        title: "Gói nhu yếu phẩm",
    });
});


module.exports = router;