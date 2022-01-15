const express = require("express");
const { get } = require("express/lib/response");
const { getAllPackage, getPackages, getPackageByIdPack } = require("../../models/manager/package")
const { countItemByIdPack, getItemByIdPack, delItemInPack } = require("../../models/manager/packageItem.M")
const { getNecsByPackId } = require("../../models/manager/necessity.M")
const router = express.Router();



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

router.get('/:id/delete-item', async(req, res) => {
    const idItem = req.params.id;
    const { idPackage } = req.query;
    const data = await delItemInPack(idPackage, idItem)

    res.redirect(`/manager/packages/${idPackage}/detail`)

})
module.exports = router;