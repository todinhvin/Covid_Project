const express = require("express");
const router = express.Router();
const { getAllAddresses } = require("../models/address");
const { getAllTreatments } = require("../models/treatment");
const {
  createPatient,
  getPatientByCCCD,
  getPatientById,
} = require("../models/patient");
router.get("/", (req, res) => {
  res.render("patient/patient");
});

router.get("/create", async (req, res) => {
  const addresses = await getAllAddresses();
  const treatments = await getAllTreatments();
  res.render("patient/createPatient", {
    addresses,
    treatments,
  });
});

router.post("/create", async (req, res) => {
  const manager = req.manager;
  console.log(req.body);
  const {
    full_name,
    cccd,
    birthday,
    status,
    address_id,
    treatment_id,
    related_person_cccd,
  } = req.body;
  const relatedPerson = await getPatientByCCCD(related_person_cccd);
  const data = await createPatient({
    full_name,
    cccd,
    birthday,
    address_id,
    treatment_id,
    status,
    manager_id: manager.id,
    related_person_id: relatedPerson.person_id,
  });
  if (data) {
    res.render("patient/createPatient?create=success");
  } else {
    res.render("patient/createPatient?create=error");
  }
});

router.get("/:id/update", async (req, res) => {
  const patient = await getPatientById(req.params.id);
  const addresses = await getAllAddresses();
  const treatments = await getAllTreatments();
  res.render("patient/updatePatient", {
    addresses,
    treatments,
    patient,
  });
});

router.post("/:id/update", (req, res) => {
  const manager = req.manager;
  console.log(req.body);
  const {
    full_name,
    cccd,
    birthday,
    status,
    address_id,
    treatment_id,
    related_person_cccd,
  } = req.body;
  res.render("patient/updatePatient");
});

router.get("/:id", (req, res) => {
  res.render("patient/detailPatient");
});

module.exports = router;
