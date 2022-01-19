const express = require("express");
const { addAccount } = require("../../models/user/account");
const router = express.Router();
router.post('/add-account',async (req,res) => {
    const data = await addAccount(req.body.username)
    if(data) {
        return res.json('success')
    }
    return res.json('error')
})


module.exports = router;


