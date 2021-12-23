const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('patient/patient');
})

router.get('/create', (req, res) => {

    res.render('patient/createPatient');
})

router.get('/detail', (req, res) => {

    res.render('patient/detailPatient');
})

module.exports = router;