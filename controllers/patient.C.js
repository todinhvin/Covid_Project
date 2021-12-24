const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("patient/patient");
});

router.get("/create", (req, res) => {
  res.render("patient/createPatient");
});

router.get("/:id/update", async (req, res) => {
  res.render("patient/updatePatient", {
    css: () => "css",
  });
});

router.get("/:id/abc", (req, res) => {
  console.log(123);
  res.render("patient/updatePatient");
});

router.get("/:id", (req, res) => {
  res.render("patient/detailPatient");
});

module.exports = router;
