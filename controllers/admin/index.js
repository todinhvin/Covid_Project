const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('admin/index');
});

router.get('/manager', (req, res) => {
  return res.render('admin/manager', { layout: false });
});

router.get('/treatment', (req, res) => {});
module.exports = router;
