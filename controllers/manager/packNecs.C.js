const express = require("express");
const { get } = require("express/lib/response");
const { getAllPackage, getPackByName, getPackages, getPackageByIdPack, addNewPack, delItemByPackId, updatePack } = require("../../models/manager/package")
const { countItemByIdPack, updateItemInPack, delItemInPack, addItemInPack, getItemById } = require("../../models/manager/packageItem.M")
const { getNecsByPackId, getAllItems } = require("../../models/manager/necessity.M")
const router = express.Router();
const { convertDate } = require("../../helper");


router.get('/', async(req, res) => {

    const { page = 1, filter, create, update, del } = req.query;
    const { totalPage, packages } = await getPackages({ page, filter });

    // console.log(packages);
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
    console.log("idpackage get- detail: ", idPackage);
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
    console.log("countItem", typeof(parseInt(countItem)));
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

    // console.log(name, due_date.split('-')[0], created_on);


    const yearDueDate = due_date.split('-')[0];
    const monthDueDate = due_date.split('-')[1];
    const dateDueDate = due_date.split('-')[2];
    // console.log(yearDueDate, monthDueDate, dateDueDate);
    // res.json({ status: "fail" }) 
    const dueDate = `${yearDueDate}-${monthDueDate}-${dateDueDate}`;
    console.log(dueDate)

    const data = await addNewPack(name, dueDate, created_on);
    console.log(data[0].package_id);
    const package_id = data[0].package_id;
    const item01 = await addItemInPack(package_id, first, amount01, limit01);
    const item02 = await addItemInPack(package_id, second, amount02, limit02);

    res.redirect('/manager/packages/?status=success');
})

// [GET] /:id/delete
router.get('/:id/delete', async(req, res) => {

    const { status } = req.query;
    const id = req.params.id;
    // console.log(id);
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
    console.log(status);
    const pack = await getPackageByIdPack(id);
    const dueDate = convertDate(pack[0].due_date);
    // console.log(date(dueDate));
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

    const { name, due_date } = req.body;
    const pack = await getPackByName(id, name);
    if (pack.length != 0) {
        console.log(pack)
            // return res.redirect(`/manager/packages/${id}/update-packs?status=001`);

    } else {
        const a = new Date();
        const year = a.getFullYear();
        const month = a.getMonth();
        const date = a.getDate();
        const created_on = `${year}-${month+1}-${date}`;
        // console.log(req.body)

        const newPack = await updatePack(id, name, due_date, created_on);

        console.log(newPack);
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
    // console.log(date(dueDate));
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
    // console.log(idPack, first);
    const data = await getItemById(idPack, first);
    // console.log("additem", idPack)
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
    console.log("result update: ", status);

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

    // const { status } = req.query;
    const idPack = req.params.id;
    console.log("id - post - update-item", idPack);
    // const pack = await getPackageByIdPack(id);
    // const dueDate = convertDate(pack[0].due_date);
    // const { idPackage } = req.query;

    // const data = await getNecsByPackId(idPackage);

    // res.render('manager/packageNecs/updateItem', {
    //     items: data,
    //     idPackage,
    // })

    // console.log(req.body);
    const { id, amount01, limit01 } = req.body;
    console.log(req.body);
    for (let i = 0; i < amount01.length; i++) {

        if (amount01[i] <= 0) {
            console.log('false');
            console.log(idPack);
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