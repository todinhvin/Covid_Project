const express = require("express");
const { get } = require("express/lib/response");
const { getAllPackage, getPackages, getPackageByIdPack, addNewPack, delItemByPackId, updatePack } = require("../../models/manager/package")
const { countItemByIdPack, getItemByIdPack, delItemInPack, addItemInPack } = require("../../models/manager/packageItem.M")
const { getNecsByPackId, getAllItems } = require("../../models/manager/necessity.M")
const router = express.Router();
const { convertDate } = require("../../helper");


router.get('/', async(req, res) => {

    const { page = 1, filter } = req.query;
    const { totalPage, packages } = await getPackages({ page, filter });

    // console.log(packages);
    res.render('manager/packageNecs/packNecs', {
        title: "Gói nhu yếu phẩm",
        packages: packages,
        totalPage: totalPage,
        filter,
    });
});


// [GET] /:id/detail
router.get('/:id/detail', async(req, res) => {

    const idPackage = req.params.id;
    const Package = await getPackageByIdPack(idPackage);
    // console.log(Package[0].name);
    const data = await getNecsByPackId(idPackage);
    // console.log(data);
    // console.log(idPackage);
    res.render('manager/packageNecs/packDetail.hbs', {
        title: `${Package[0].name}`,
        items: data,
    })
})

// [GET] /:id/detete-item
router.get('/:id/delete-item', async(req, res) => {
    const idItem = req.params.id;
    const { idPackage } = req.query;
    const data = await delItemInPack(idPackage, idItem)

    res.redirect(`/manager/packages/${idPackage}/detail`)

})

// [GET] /packages/create

router.get('/create', async(req, res) => {

    const data = await getAllItems();

    res.render('manager/packageNecs/createPack', {
        items: data,
        title: 'Tạo gói nhu yếu phẩm mới'
    });

})

// [POST] /packages/create

router.post('/create', async(req, res) => {

    console.log(req.body);

    const { name, due_date, first, amount01, limit01, second, amount02, limit02 } = req.body;
    const a = new Date();
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const created_on = `${year}-${month+1}-${date}`;

    const yearDueDate = due_date.split('-')[0];
    const monthDueDate = due_date.split('-')[1];
    const dateDueDate = due_date.split('-')[2];

    const dueDate = `${yearDueDate}-${monthDueDate}-${dateDueDate}`;
    console.log(dueDate)

    const data = await addNewPack(name, dueDate, created_on);
    console.log(data[0].package_id);
    const package_id = data[0].package_id;
    const item01 = await addItemInPack(package_id, first, amount01, limit01);
    const item02 = await addItemInPack(package_id, second, amount02, limit02);

    res.redirect('/manager/packages/?status = success');
})

// [GET] /:id/delete
router.get('/:id/delete', async(req, res) => {

    const id = req.params.id;
    console.log(id);
    await delItemByPackId(id);
    res.redirect('/manager/packages/?statusdel = success');
})

// [GET]
router.get('/:id/update-packs', async(req, res) => {

    const id = req.params.id;
    console.log(id);
    const pack = await getPackageByIdPack(id);
    const dueDate = convertDate(pack[0].due_date);
    // console.log(date(dueDate));
    res.render('manager/packageNecs/updatePack', {
        name: pack[0].name,
        due_date: dueDate,
        title: `Cập nhật - ${pack[0].name}`,
        id: id,
    })
});

// [POST]
router.post('/:id/update-packs', async(req, res) => {
    const id = req.params.id;
    const { name, due_date } = req.body;
    const a = new Date();
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const created_on = `${year}-${month+1}-${date}`;
    console.log(req.body)

    await updatePack(id, name, due_date, created_on)
    res.redirect(`/manager/packages/${id}/update-packs`)
})
module.exports = router;