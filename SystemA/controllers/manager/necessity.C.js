const express = require("express");
const router = express.Router();
const {
    getNecessities,
    addNewNecs,
    getNecsById,
    updateNecs,
    delItemByItemId,
    getNecsByName,
    getNecsBySearch,
} = require("../../models/manager/necessity.M");

const upload = require("../../middlewares/uploadFile");
const { getAccount, changeAccount } = require("../../models/user/account");
const jwt = require("jsonwebtoken");



//[GET] package/search
router.get('/search', async(req, res) => {
    const { page = 1, search, filter } = req.query;

    const { totalPage, items } = await getNecsBySearch({ page, search, filter });
    res.render("manager/necessity/necessity", {
        title: "Nhu yếu phẩm",
        items: items,
        totalPage: totalPage,
        page,
        search,
        url: "/manager/package",
    })

})

// [GET]  /manager/package

router.get("/", async(req, res) => {
    // console.log(req.query);

    const { page = 1, filter, update, create, del } = req.query;
    const { totalPage, items } = await getNecessities({ page, filter });
    res.render("manager/necessity/necessity", {
        title: "Nhu yếu phẩm",
        items: items,
        totalPage: totalPage,
        filter,
        update,
        create,
        del,
    });
});

// [GET] /manager/package/create
router.get("/create", async(req, res) => {

    let account;
    const token = req.cookies.jwt;
    await jwt.verify(token, "secret", async(err, decodedToken) => {
        //console.log(decodedToken);
        account = await getAccount("account_id", decodedToken.id);
    });

    const { status } = req.query;
    const a = new Date();
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    // console.log(`${date}/${month + 1}/${year}`);
    res.render("manager/necessity/createNewNecs", {
        title: "Thêm nhu yếu phẩm mới",
        status,
    });
});

// [POST] /manager/package/create
router.post("/create", upload.array("images"), async(req, res) => {


    let account;
    const token = req.cookies.jwt;
    await jwt.verify(token, "secret", async(err, decodedToken) => {

        account = await getAccount("account_id", decodedToken.id);
    });


    // Xử lý lưu hình ảnh
    var images = req.files.map((file) => file.filename);

    const { name, price, unit } = req.body;

    const isExistName = await getNecsByName(name);


    if (isExistName.length != 0) {
        return res.redirect(`/manager/package/create?status=001`);
    }

    // Lấy tạm manage_id
    const manager_id = account.account_id;
    const a = new Date();
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const created_on = `${year}-${month + 1}-${date}`;


    const newItem = await addNewNecs(
        name,
        `{${images}}`,
        price,
        unit,
        created_on,
        manager_id
    );

    if (newItem) {
        res.redirect("/manager/package/?create=success");
    } else { res.redirect("/manager/package/?create=failed") }
});

// [GET] /manager/package/:id/update

router.get("/:id/update", async(req, res) => {
    const idPackage = req.params.id;
    const { status } = req.query;
    const data = await getNecsById(idPackage);


    res.render("manager/necessity/updateNecs.hbs", {
        title: "Cập nhật sản phẩm",
        name: data[0].name,
        price: data[0].price,
        unit: data[0].unit,
        item_id: data[0].item_id,
        images: data[0].image,
        status,
    });
});

// [POST] /manager/package/:id/update
router.post("/:id/update", async(req, res) => {


    // Lấy tạm manage_id
    var idItem = req.params.id;
    const { id } = req.params;

    const { name, image, price, unit } = req.body;

    const isExistName = await getNecsByName(name);

    if (isExistName.length != 0 && isExistName[0].item_id != idItem) {
        return res.redirect(`/manager/package/${id}/update?status=001`);
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    const created_on = `${year}-${month + 1}-${date}`;

    const newItem = await updateNecs(
        id,
        name,
        price,
        unit,
        created_on,
    );

    if (newItem) {
        res.redirect("/manager/package/?update=success&filter=item_id");
    } else {
        res.redirect("/manager/package/?update=failed");
    }

});



router.get("/:id/delete", async(req, res) => {
    const { id } = req.params;

    const data = await delItemByItemId(id);

    if (data) {
        res.redirect("/manager/package/?del=success&filter=item_id");
    } else { res.redirect("/manager/package/?del=failed&filter=item_id") }
});

router.get("/:id/detail", async(req, res) => {
    const { id } = req.params;

    const necessity = await getNecsById(id);
    res.render("manager/necessity/detailNecs.hbs", {
        title: `${necessity[0].name} - Chi tiết`,

        images: necessity[0].image,
    });
});

module.exports = router;