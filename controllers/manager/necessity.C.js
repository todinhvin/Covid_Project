const express = require("express");
const router = express.Router();
const {
    getNecessities,
    addNewNecs,
    getNecsById,
    updateNecs,
    delItemByItemId,
} = require("../../models/manager/necessity.M");

const upload = require("../../middlewares/uploadFile");



// [GET]  /manager/package

router.get("/", async(req, res) => {
    const { page = 1, filter } = req.query;
    const { totalPage, items } = await getNecessities({ page, filter });
    res.render("manager/necessity/necessity", {
        title: "Nhu yếu phẩm",
        items: items,
        totalPage: totalPage,
        filter,
    });
});

// [GET] /manager/package/create
router.get("/create", async(req, res) => {
    const a = new Date();
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    console.log(`${date}/${month + 1}/${year}`);
    res.render("manager/necessity/createNewNecs", {
        title: "Thêm nhu yếu phẩm mới",
    });
});

// [POST] /manager/package/create
router.post("/create", upload.array("images"), async(req, res) => {

    // Xử lý lưu hình ảnh
    var images = req.files.map((file) => file.filename);
    console.log("hình ảnh:", images);
    const { name, price, unit } = req.body;
    // console.log(images)

    // Lấy tạm manage_id
    const manager_id = 2;
    const a = new Date();
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const created_on = `${year}-${month + 1}-${date}`;
    const pathImg = {};

    const newItem = await addNewNecs(
        name,
        `{${images}}`,
        price,
        unit,
        created_on,
        manager_id
    );
    console.log("new data : ", newItem[0].image[0]);
    res.redirect("/manager/package");
});

// [GET] /manager/package/:id/update

router.get("/:id/update", async(req, res) => {
    const idPackage = req.params.id;
    const data = await getNecsById(idPackage);

    console.log(data[0]);
    res.render("manager/necessity/updateNecs.hbs", {
        title: "Cập nhật sản phẩm",
        name: data[0].name,
        price: data[0].price,
        unit: data[0].unit,
        item_id: data[0].item_id,
        images: data[0].image,
    });
});

// [POST] /manager/package/:id/update
router.post("/:id/update", async(req, res) => {
    console.log(req.body);
    // Lấy tạm manage_id
    const manager_id = 2;
    const { id } = req.params;
    const { name, image, price, unit } = req.body;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    const created_on = `${year}-${month + 1}-${date}`;
    // console.log(id);
    const newItem = await updateNecs(
        id,
        name, `{w3schools.com/jsref/jsref_parseint.asp}`,
        price,
        unit,
        created_on,
        manager_id
    );
    // console.log(newItem);
    res.redirect("/manager/package?filter=item_id");
});



router.get("/:id/delete", async(req, res) => {
    const { id } = req.params;

    // console.log(id);
    // await delRowPackItemByItemId(id);
    // await delRowCheckOutByItemId(id);
    const data = await delItemByItemId(id);
    // console.log(data);
    res.redirect("/manager/package");
});

router.get("/:id/detail", async(req, res) => {
    const { id } = req.params;

    // console.log(id);
    const necessity = await getNecsById(id);
    console.log(necessity[0].image)


    res.render("manager/necessity/detailNecs.hbs", {
        title: `${necessity[0].name} - Chi tiết`,

        images: necessity[0].image,
    });
});

module.exports = router;