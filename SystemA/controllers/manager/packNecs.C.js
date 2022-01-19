const express = require("express");
const { get } = require("express/lib/response");
const { getPacksBySearch, getPackByName, getPackages, getPackageByIdPack, addNewPack, delItemByPackId, updatePack } = require("../../models/manager/package")
const { countItemByIdPack, updateItemInPack, delItemInPack, addItemInPack, getItemById } = require("../../models/manager/packageItem.M")
const { getNecsByPackId, getAllItems } = require("../../models/manager/necessity.M")
const router = express.Router();
const { convertDate } = require("../../helper");


//[GET] packages/search
router.get('/search', async(req, res) => {
    const { page = 1, search, filter } = req.query;

    const { totalPage, packages } = await getPacksBySearch({ page, search, filter });

    res.render("manager/packageNecs/packNecs", {
        totalPage: totalPage,
        page,
        search,
        url: "/manager/packages",
        title: "Gói nhu yếu phẩm",
        packages: packages,
        filter,

    })

})

//[GET] packages/
router.get('/', async(req, res) => {


    const { page = 1, filter, create, update, del } = req.query;
    const { totalPage, packages } = await getPackages({ page, filter });
    res.render('manager/packageNecs/packNecs', {
        title: "Gói nhu yếu phẩm",
        packages: packages,
        totalPage: totalPage,
        filter,
        create,
        update,
        del
    });
});


// [GET] /:id/detail
router.get('/:id/detail', async(req, res) => {

    const idPackage = req.params.id;
    const { add, del } = req.query;
    const Package = await getPackageByIdPack(idPackage);

    const data = await getNecsByPackId(idPackage);

    res.render('manager/packageNecs/packDetail.hbs', {
        title: `${Package[0].name}`,
        items: data,
        idPackage: idPackage,
        add,
        del,
    })
})

// [GET] /:id/detete-item
router.get('/:id/delete-item', async(req, res) => {
    const idItem = req.params.id;
    const { idPackage } = req.query;


    const countItem = await countItemByIdPack(idPackage);
    if (parseInt(countItem) < 3) {
        return res.redirect(`/manager/packages/${idPackage}/detail?del=001`)
    } else {
        const data = await delItemInPack(idPackage, idItem)

        if (data.length != 0) {
            res.redirect(`/manager/packages/${idPackage}/detail?del=success`)
        } else {
            res.redirect(`/manager/packages/${idPackage}/detail?del=failed`)
        }
    }

})

// [GET] /packages/create

router.get('/create', async(req, res) => {

    const status = req.query.status;
    const data = await getAllItems();
    res.render('manager/packageNecs/createPack', {
        items: data,
        title: 'Tạo gói nhu yếu phẩm mới',
        status,
    });

})

// [POST] /packages/create

router.post('/create', async(req, res) => {


    const { name, due_date, first, amount01, limit01, second, amount02, limit02 } = req.body;
    const pack = await getPackByName(name);
    if (pack.length != 0) {
        res.redirect('/manager/packages/create?status=001');

    } else if (first == second) {
        res.redirect('/manager/packages/create?status=004');
    } else if (amount01 > limit01 || amount02 > limit02) {
        res.redirect('/manager/packages/create?status=002');
    } else if (0 > amount01 || 0 > amount02 || amount01 > limit01 || amount02 > limit02) {
        res.redirect('/manager/packages/create?status=003');

    } else {
        const a = new Date();
        const year = a.getFullYear();
        const month = a.getMonth();
        const date = a.getDate();
        const created_on = `${year}-${month+1}-${date}`;

        const yearDueDate = due_date.split('-')[0];
        const monthDueDate = due_date.split('-')[1];
        const dateDueDate = due_date.split('-')[2];

        const dueDate = `${yearDueDate}-${monthDueDate}-${dateDueDate}`;


        const data = await addNewPack(name, dueDate, created_on);
        const package_id = data[0].package_id;
        const item01 = await addItemInPack(package_id, first, amount01, limit01);
        const item02 = await addItemInPack(package_id, second, amount02, limit02);

        if (item01.length > 0 && item02.length > 0) {
            res.redirect('/manager/packages/?create=success')
        };
    }
})

// [GET] /:id/delete
router.get('/:id/delete', async(req, res) => {

    const { status } = req.query;
    const id = req.params.id;
    const data = await delItemByPackId(id);
    if (data.length != 0) {
        res.redirect('/manager/packages/?del=success');
    } else {
        res.redirect('/manager/packages/?del=failed');
    }
})

// [GET]
router.get('/:id/update-packs', async(req, res) => {

    const { status } = req.query;
    const id = req.params.id;
    const pack = await getPackageByIdPack(id);
    const dueDate = convertDate(pack[0].due_date);
    res.render('manager/packageNecs/updatePack', {
        name: pack[0].name,
        due_date: dueDate,
        title: `Cập nhật - ${pack[0].name}`,
        id: id,
        status: status,
    })

});

// [POST]
router.post('/:id/update-packs', async(req, res) => {
    const id = req.params.id;

    var { name, due_date } = req.body;
    name = name.trim();
    const pack = await getPackByName(name);
    if (pack.length != 0 && pack[0].package_id != id) {
        return res.redirect(`/manager/packages/${id}/update-packs?status=001`);

    } else {
        const a = new Date();
        const year = a.getFullYear();
        const month = a.getMonth();
        const date = a.getDate();
        const created_on = `${year}-${month+1}-${date}`;

        const newPack = await updatePack(id, name, due_date, created_on);

        if (newPack) {
            res.redirect(`/manager/packages/?update=success&filter=package_id`)
        } else {
            res.redirect(`/manager/packages/?update=failed`)
        }
    }
})

// [GET]
router.get('/:id/addItem', async(req, res) => {

    const { status } = req.query;
    const id = req.params.id;

    const pack = await getPackageByIdPack(id);
    const dueDate = convertDate(pack[0].due_date);
    const data = await getAllItems();
    res.render('manager/packageNecs/addItem', {
        items: data,
        title: 'Thêm nhu yếu phẩm mới vào gói',
        idPackage: id,
        status,
    })
});


// [POST] /:id/addItem
router.post('/:id/addItem', async(req, res) => {

    const idPack = req.params.id;
    const { first, amount01, limit01 } = req.body;
    if (0 > amount01 || amount01 > limit01) {
        return res.redirect(`/manager/packages/${idPack}/addItem?status=002`)
    }
    const data = await getItemById(idPack, first);
    if (data.length != 0) {
        return res.redirect(`/manager/packages/${idPack}/addItem?status=001`)
    }
    const newItem = await addItemInPack(idPack, first, amount01, limit01);

    if (newItem) {
        return res.redirect(`/manager/packages/${idPack}/detail?add=success`)
    }
    return res.redirect(`/manager/packages/${idPack}/detail?add=failed`)
});



// [GET]
router.get('/:id/update-item', async(req, res) => {

    const { update, status } = req.query;
    const idPackage = req.params.id;

    const data = await getNecsByPackId(idPackage);
    const name = await getPackageByIdPack(idPackage);
    res.render('manager/packageNecs/updateItem', {
        items: data,
        idPackage,
        title: `Cập nhật - ${name[0].name}`,
        update,
        status,
    })

});

// [POST]
router.post('/:id/update-item', async(req, res) => {

    const idPack = req.params.id;

    const { id, amount01, limit01 } = req.body;
    for (let i = 0; i < amount01.length; i++) {

        if (amount01[i] <= 0) {
            return res.redirect(`/manager/packages/${idPack}/update-item?status=002`);
        } else {

            if (amount01[i] > limit01[i]) {
                return res.redirect(`/manager/packages/${idPack}/update-item?status=003`);
            }
        }
    }

    var flag = false;
    for (let i = 0; i < amount01.length; i++) {
        const data = updateItemInPack(idPack, id[i], amount01[i], limit01[i])

        if (data.length == 0) {
            return res.redirect(`/manager/packages/${idPack}/update-item?update=failed`);
        }

    }

    res.redirect(`/manager/packages/${idPack}/update-item?update=success`);

});
module.exports = router;