const express = require('express');
const router = express.Router();

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
} = require('../../models/admin/index');

router.get('/', async (req, res) => {
  const noManager = await countManager();
  const noTreatment = await countTreatment();

  return res.render('admin/index', {
    noManager: noManager,
    noTreatment: noTreatment,
  });
});

router.get('/manager/', async (req, res) => {
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
  console.log(paginated);

  return res.render('admin/manager', {
    managerList: paginated.data,
    indexList: paginated.indexList,
    hasPrevious: paginated.hasPrevious,
    hasNext: paginated.hasNext,
    currentPage: paginated.pageIndex,
    totalPage: paginated.totalPage,
    layout: false,
  });
});

router.post('/manager/disable', async (req, res) => {
  const manager_id = req.body.account_id;
  const disableRes = await setManagerInactive(manager_id);
  return res.redirect('/admin/manager');
});

router.post('/manager/enable', async (req, res) => {
  const manager_id = req.body.account_id;
  const disableRes = await setManagerActive(manager_id);
  return res.redirect('/admin/manager');
});

router.post('/manager/create', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const createRes = await createManager(username, password);
  return res.redirect('/admin/manager');
});

router.get('/treatment', (req, res) => {});
module.exports = router;
