const express = require('express');
const router = express.Router();
const {
  getAllAddresses,
  getAddressByID,
} = require('../../models/manager/address');
const {
  getAllTreatments,
  getTreatmentByID,
} = require('../../models/manager/treatment');
const { getPatients, updatePatient } = require('../../models/manager/patient');
const { convertDate } = require('../../helper');
const {
  createPatient,
  getPatientByCCCD,
  getPatientById,
} = require('../../models/manager/patient');

router.get('/', async (req, res) => {
  const { page = 1, per_page = 4 } = req.query;
  const { totalPage, patients } = await getPatients({ page, per_page });
  res.render('manager/patient/patient', {
    patients: patients,
    totalPage,
    page,
  });
});

router.get('/create', async (req, res) => {
  const addresses = await getAllAddresses();
  const treatments = await getAllTreatments();
  res.render('manager/patient/createPatient', {
    addresses,
    treatments,
  });
});

router.post('/create', async (req, res) => {
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

  let relatedPerson;
  if (related_person_cccd != '0') {
    relatedPerson = await getPatientByCCCD(related_person_cccd);
  }
  const data = await createPatient({
    full_name,
    cccd,
    birthday,
    address_id,
    treatment_id,
    status,
    manager_id: 2,
    related_person_id:
      related_person_cccd != '0' ? relatedPerson.person_id : '0',
  });
  if (data) {
    return res.redirect('patient/createP?create=success');
  } else {
    return res.redirect('patient/create?create=error');
  }
});

router.get('/:id/update', async (req, res) => {
  const patient = await getPatientById(req.params.id);
  console.log(patient);
  const addresses = await getAllAddresses();
  const treatments = await getAllTreatments();
  patient.birthday = convertDate(patient.birthday);
  console.log(patient.birthday);
  res.render('manager/patient/updatePatient', {
    addresses,
    treatments,
    patient,
  });
});

router.post('/:id/update', async (req, res) => {
  const { id } = req.params;
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
  let relatedPerson;
  if (related_person_cccd != '0') {
    relatedPerson = await getPatientByCCCD(related_person_cccd);
  }

  const data = await updatePatient({
    person_id: id,
    full_name,
    cccd,
    birthday: new Date(birthday),
    address_id,
    treatment_id,
    status,
    manager_id: 2,
    related_person_id:
      related_person_cccd != '0' ? relatedPerson.person_id : '0',
  });
  if (data) {
    return res.redirect('patient/:id/update?update=success');
  } else {
    return res.redirect('patient/:id/update?update=error');
  }
});

router.get('/:id', (req, res) => {
  res.render('manager/patient/detailPatient');
});

module.exports = router;
