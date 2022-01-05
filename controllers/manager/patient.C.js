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
const {
  getPatients,
  getDetailsPatientById,
  getPatientsBySearch,
  getPatientsKB,
  updatePatient,
  removePatient,
} = require('../../models/manager/patient');
const { convertDate } = require('../../helper');
const {
  createPatient,
  getPatientByCCCD,
  getPatientById,
} = require('../../models/manager/patient');
router.get('/', async (req, res) => {
  const { page = 1, filter } = req.query;
  const { totalPage, patients } = await getPatients({ page, filter });

  res.render('manager/patient/patient', {
    patients: patients,
    totalPage,
    page,
    filter,
    url: '/manager/patient',
  });
});

router.get('/KB', async (req, res) => {
  const { page = 1, filter } = req.query;
  const { totalPage, patients } = await getPatientsKB({ page, filter });
  res.render('manager/patient/patient', {
    patients: patients,
    totalPage,
    page,
    filter,
    url: '/manager/patient/KB',
  });
});

router.get('/search', async (req, res) => {
  const { page = 1, search } = req.query;
  const { totalPage, patients } = await getPatientsBySearch({ page, search });
  res.render('manager/patient/patient', {
    patients: patients,
    totalPage,
    page,
    search,
    url: '/manager/patient/search',
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
  if (related_person_cccd) {
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
    related_person_id: related_person_cccd ? relatedPerson.person_id : -1,
  });
  if (data) {
    return res.redirect('/manager/patient?create=success');
  } else {
    return res.redirect('/manager/patient?create=error');
  }
});

router.get('/:id/update', async (req, res) => {
  const patient = await getPatientById(req.params.id);
  const addresses = await getAllAddresses();
  const treatments = await getAllTreatments();
  patient.birthday = convertDate(patient.birthday);
  res.render('manager/patient/updatePatient', {
    addresses,
    treatments,
    patient,
  });
});

router.post('/:id/update', async (req, res) => {
  const { id } = req.params;
  const manager = req.manager;
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
  if (related_person_cccd) {
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
    related_person_id: related_person_cccd ? relatedPerson.person_id : -1,
  });
  if (data) {
    return res.redirect('/manager/patient/?update=success');
  } else {
    return res.redirect('/manager/patient/?update=error');
  }
});

router.get('/:id/delete', async (req, res) => {
  const { id } = req.params;

  removePatient({ person_id: id, manager_id: 2 });
  return res.redirect('/manager/patient/?remove=success');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { patient, statusHis, treatmentHis } = await getDetailsPatientById(id);
  res.render('manager/patient/detailPatient', {
    patient,
    statusHis,
    treatmentHis,
  });
});

module.exports = router;
