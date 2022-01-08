const express = require("express");
const router = express.Router();
const { getNecessities, addNewNecs } = require("../../models/manager/necessity.M")

// [GET]  /manager/package

router.get("/", async(req, res) => {
    const { page = 1, filter } = req.query;
    const { totalPage, items } = await getNecessities({ page, filter });
    res.render("manager/necessity/necessity", {

        title: "Nhu yếu phẩm",
        items: items,
        totalPage: totalPage,
        filter,
    })
})

// [GET] /manager/package/create
router.get("/create", async(req, res) => {
    const a = new Date();
    const year = a.getFullYear()
    const month = a.getMonth()
    const date = a.getDate()
    console.log(`${date}/${month+1}/${year}`)
    res.render("manager/necessity/createNewNecs", {
        title: "Thêm nhu yếu phẩm mới",
    })
})

// [POST] /manager/package/create
router.post("/create", async(req, res) => {

    console.log(req.body)
    const { name, image, price, unit } = req.body;

    const manager_id = 2;
    const a = new Date();
    const year = a.getFullYear()
    const month = a.getMonth()
    const date = a.getDate()
    const created_on = `${date}/${month+1}/${year}`
    const newItem = await addNewNecs(name, `{w3schools.com/jsref/jsref_parseint.asp}`, price, unit, created_on, manager_id);
    console.log("new data : ", newItem);


    res.redirect('/manager/package/?update=success');
})
module.exports = router;