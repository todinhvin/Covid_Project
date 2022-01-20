const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

router.get("/", (req, res, next) => {
    res.send("admin");
})

module.exports = router;