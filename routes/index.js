const express = require('express');
const managerRoute = require('./manager');
const userRoute = require('./user');
const adminRoute = require('./admin');

const router = express.Router();

router.use('/manager', managerRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);

module.exports = router;
