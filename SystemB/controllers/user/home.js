const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { state } = req.query;
  res.render("homeUser", {
    state,
  });
});




module.exports = router;
