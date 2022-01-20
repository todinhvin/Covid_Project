const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/:info", (req, res) => {
  try {
    const { info } = req.params;
    var decoded = jwt.verify(info, 'secret');
    req.jwt  = jwt;
    req.account
    console.log(req.url)
    console.log(decoded)

    res.render("user/payment");
    

  } catch(err) {
    console.log(err)
  }
  
});

router.get("/", (req, res) => {
  const { state } = req.query;
  res.render("homeUser", {
    state:state?state:'',
  });
});





module.exports = router;
