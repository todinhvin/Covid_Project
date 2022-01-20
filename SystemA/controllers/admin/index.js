const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const {
    countManager,
    countTreatment,
    getAllManagers,
    getTreatmentHistoryByManagerId,
    getStatusHistoryByManagerId,
    setManagerInactive,
    setManagerActive,
    createManager,
    paginate,
    getAllTreatments,
    searchManagerByUsername,
    updateTreatmentCapacity,
    updateTreatmentManager,
    createTreatment,
} = require('../../models/admin/index');

const saltRounds = 10;

// [GET] /admin/
router.get('/', async(req, res) => {
    const noManager = await countManager();
    const noTreatment = await countTreatment();

    return res.render('admin/index', {
        noManager: noManager,
        noTreatment: noTreatment,
    });
});

// [GET] /admin/manager/
router.get('/manager/', async(req, res) => {
    const pageIndex = +req.query.pageIndex || 1;
    const managerList = await getAllManagers();
    for (const manager of managerList) {
        manager['treatment_history'] = await getTreatmentHistoryByManagerId(
            manager.account_id
        );

        manager['status_history'] = await getStatusHistoryByManagerId(
            manager.account_id
        );

        manager['hasStatusHistory'] = manager.status_history.length > 0;
        manager['hasTreatmentHistory'] = manager.treatment_history.length > 0;
        manager['isActive'] = manager.status === 'active';
    }

    const paginated = paginate(managerList, pageIndex, 5);

    return res.render('admin/manager', {
        managerList: paginated.data,
        indexList: paginated.indexList,
        hasPrevious: paginated.hasPrevious,
        hasNext: paginated.hasNext,
        next: paginated.pageIndex + 1,
        previous: paginated.pageIndex - 1,
        currentPage: paginated.pageIndex,
        totalPage: paginated.totalPage,
        // layout: false,
    });
});

// [GET] /admin/manager/history/treatment/:account_id
router.get('/manager/history/treatment/:account_id', async(req, res) => {
    const account_id = +req.params.account_id;
    const treatment_history = await getTreatmentHistoryByManagerId(account_id);
    return res.render('admin/history/treatment', {
        treatment_history,
        hasTreatmentHistory: treatment_history.length > 0,
    });
});

// [GET] /admin/manager/history/status/:account_id
router.get('/manager/history/status/:account_id', async(req, res) => {
    const account_id = +req.params.account_id;
    const status_history = await getStatusHistoryByManagerId(account_id);
    return res.render('admin/history/status', {
        status_history,
        hasStatusHistory: status_history.length > 0,
    });
});

// [GET] /admin/treatment
router.get('/treatment', async(req, res) => {
    const pageIndex = +req.query.pageIndex || 1;
    const treatments = await getAllTreatments();
    const treatmentPaged = paginate(treatments, pageIndex, 10);
    res.render('admin/treatment', {
        treatmentList: treatmentPaged.data,
        indexList: treatmentPaged.indexList,
        previous: treatmentPaged.prev,
        next: treatmentPaged.next,
        hasNext: treatmentPaged.hasNext,
        hasPrevious: treatmentPaged.hasPrevious,
        pageIndex: treatmentPaged.pageIndex,
        totalPage: treatmentPaged.totalPage,
    });
});

router.post('/manager/disable', async(req, res) => {
    const manager_id = req.body.account_id;
    const disableRes = await setManagerInactive(manager_id);
    return res.redirect('/admin/manager');
});

router.post('/manager/enable', async(req, res) => {
    const manager_id = req.body.account_id;
    const disableRes = await setManagerActive(manager_id);
    return res.redirect('/admin/manager');
});

router.post('/manager/create', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log(username + ' ' + hash);

    const createRes = await createManager(username, hash);
    return res.redirect('/admin/manager');
});

router.post('/treatment/updateCapacity', async(req, res) => {
    const treatmentId = +req.body.treatmentId;
    const newCapacity = +req.body.newCapacity;
    console.log(treatmentId + ' ' + newCapacity);
    const updateRes = await updateTreatmentCapacity(treatmentId, newCapacity);
    if (updateRes) {
        return res.redirect('/admin/treatment');
    } else {
        const pageIndex = +req.query.pageIndex || 1;
        const treatments = await getAllTreatments();
        const treatmentPaged = paginate(treatments, pageIndex, 10);
        const treatmentFind = treatments.find(
            (treatment) => (treatment.treatment_id = treatmentId)
        );
        console.log(treatmentFind);
        return res.render('admin/treatment', {
            currentTreatment: treatmentFind.name,
            updateFailed: true,
            treatmentList: treatmentPaged.data,
            indexList: treatmentPaged.indexList,
            previous: treatmentPaged.prev,
            next: treatmentPaged.next,
            hasNext: treatmentPaged.hasNext,
            hasPrevious: treatmentPaged.hasPrevious,
            pageIndex: treatmentPaged.pageIndex,
            totalPage: treatmentPaged.totalPage,
        });
    }
});

router.post('/treatment/updateManager', async(req, res) => {
    const treatmentId = +req.body.treatmentId;
    const managerId = +req.body.id;
    console.log(treatmentId + ' ' + managerId);

    const updateRes = await updateTreatmentManager(treatmentId, managerId);
    return res.redirect('/admin/treatment');
});

router.post('/treatment', async(req, res) => {
    const treatmentName = req.body.treatmentName;
    const capacity = +req.body.capacity;
    console.log(treatmentName, capacity);

    const updateRes = await createTreatment(treatmentName, capacity);
    return res.redirect('/admin/treatment');
});

// API
router.get('/manager/search', async(req, res) => {
    const username = req.query.username.replaceAll('"', '');
    console.log(username);
    const rows = await searchManagerByUsername(username);
    console.log(rows);
    return res.send(rows.length === 0 ? [] : rows[0]);
});

module.exports = router;