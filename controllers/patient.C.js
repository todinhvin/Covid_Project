const express = require("express");
const router = express.Router();
const { getAllAddresses, getAddressByID } = require("../models/address");
const { getAllTreatments, getTreatmentByID } = require("../models/treatment");
const { getPatients } = require("../models/patient");
const { convertDate } = require("../helper");
const {
  createPatient,
  getPatientByCCCD,
  getPatientById,
} = require("../models/patient");
router.get("/", async (req, res) => {
  const { page = 1, per_page = 4 } = req.query;
  const { totalPage, patients } = await getPatients({ page, per_page });
  res.render("patient/patient", {
    patients: patients,
    totalPage,
    page,
  });
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
  // const manager = req.manager;
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
  console.log(relatedPerson);
  const data = await createPatient({
    full_name,
    cccd,
    birthday,
    address_id,
    treatment_id,
    status,
    manager_id: 2,
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
  patient.birthday = convertDate(patient.birthday);
  console.log(patient.birthday);
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
  console.log(new Date(birthday));
  res.render("patient/updatePatient");
});

router.get("/:id", (req, res) => {
  res.render("patient/detailPatient");
});

module.exports = router;
