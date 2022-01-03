const db = require("../db");

const { getAddressByID } = require("./address");
const { getTreatmentByID } = require("./treatment");
const { addStatusPerson } = require("./status_history");
const { addTreatmentPerson } = require("./treatment_history");

const getTotalPatients = async () => {
  const { rows } = await db.query("SELECT COUNT(*) FROM person");
  return rows[0].count;
};

exports.getPatients = async ({ page, per_page = 6 }) => {
  const offset = (page - 1) * per_page;
  const { rows } = await db.query(
    "SELECT * FROM person  WHERE status!=$1 LIMIT $2 OFFSET $3",
    ["KB", per_page, offset]
  );
  let patients = [];
  rows.forEach(async (patient) => {
    const addressO = await getAddressByID(patient.address_id);
    const treamentO = await getTreatmentByID(patient.treatment_id);
    let relatedPerson = "Chưa xác định được";
    if (patient.related_person_id > -1) {
      related = await getPatientById(patient.related_person_id);
      relatedPerson = related.full_name + "  " + "cccd: " + related.cccd;
    }

    Object.assign(patient, {
      address: `${addressO.xa}-${addressO.huyen}-${addressO.tinh}`,
      treatment: treamentO.name,
      related_person: relatedPerson,
    });
    patients.push(patient);
  });

  const totalPatients = await getTotalPatients();
  const totalPage =
    totalPatients % per_page === 0
      ? totalPatients / per_page
      : Math.floor(totalPatients / per_page) + 1;
  return {
    totalPage: totalPage,
    patients: patients,
  };
};

exports.getPatientsKB = async ({ page, per_page = 6 }) => {
  const offset = (page - 1) * per_page;
  const { rows } = await db.query(
    "SELECT * FROM person  WHERE status=$1 LIMIT $2 OFFSET $3",
    ["KB", per_page, offset]
  );
  let patients = [];
  rows.forEach(async (patient) => {
    const addressO = await getAddressByID(patient.address_id);
    const treamentO = await getTreatmentByID(patient.treatment_id);
    let relatedPerson = "Chưa xác định được";
    if (patient.related_person_id > -1) {
      related = await getPatientById(patient.related_person_id);
      relatedPerson = related.full_name + "  " + "cccd: " + related.cccd;
    }

    Object.assign(patient, {
      address: `${addressO.xa}-${addressO.huyen}-${addressO.tinh}`,
      treatment: treamentO.name,
      related_person: relatedPerson,
    });
    patients.push(patient);
  });

  const totalPatients = await getTotalPatients();
  const totalPage =
    totalPatients % per_page === 0
      ? totalPatients / per_page
      : Math.floor(totalPatients / per_page) + 1;
  return {
    totalPage: totalPage,
    patients: patients,
  };
};

const getPatientById = async (patient_id) => {
  const { rows } = await db.query(
    'SELECT * FROM person where "person_id" =$1 ',
    [patient_id]
  );
  let patient = rows[0];
  if (rows[0] && rows[0].related_person_id > -1) {
    const relatedPerson = await getPatientById(rows[0].related_person_id);
    // console.log(relatedPerson);
    patient = Object.assign(patient, {
      related_person_cccd: relatedPerson.cccd,
    });
  }
  return patient;
};

exports.getPatientById = getPatientById;

exports.getPatientByCCCD = async (cccd) => {
  const { rows } = await db.query('SELECT * FROM person where "cccd" =$1 ', [
    cccd,
  ]);
  return rows[0];
};

exports.createPatient = async ({
  full_name,
  cccd,
  birthday,
  address_id,
  related_person_id,
  treatment_id,
  status,
  manager_id,
}) => {
  const { rows } = await db.query(
    'INSERT INTO public."person"("full_name","cccd","birthday","address_id","related_person_id","treatment_id","status","manager_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;',
    [
      full_name,
      cccd,
      birthday,
      address_id,
      related_person_id,
      treatment_id,
      status,
      manager_id,
    ]
  );

  if (rows[0]) {
    addStatusPerson({ person_id: rows[0].person_id, status, manager_id });
    addTreatmentPerson({
      person_id: rows[0].person_id,
      treatment_id,
      manager_id,
    });
  }
  return rows[0];
};

exports.updatePatient = async ({
  person_id,
  full_name,
  cccd,
  birthday,
  address_id,
  related_person_id,
  treatment_id,
  status,
  manager_id,
}) => {
  const oldPatient = await getPatientById(person_id);

  const { rows } = await db.query(
    'UPDATE public."person" SET "full_name"=$1, "cccd"=$2, "birthday"=$3, "address_id"=$4, "related_person_id"=$5, "treatment_id"=$6, "status"=$7, "manager_id"=$8 WHERE "person_id"=$9 RETURNING *;',
    [
      full_name,
      cccd,
      birthday,
      address_id,
      related_person_id,
      treatment_id,
      status,
      manager_id,
      person_id,
    ]
  );
  if (status != oldPatient.status) {
    addStatusPerson({ person_id, status, manager_id });
  }
  if (treatment_id != oldPatient.treatment_id) {
    addTreatmentPerson({ person_id, treatment_id, manager_id });
  }
  return rows[0];
};

exports.removePatient = async ({ person_id, manager_id }) => {
  await db.query(
    'UPDATE public."person" SET "status"=$1, "manager_id"=$2 WHERE "person_id"=$3',
    ["KB", manager_id, person_id]
  );
  addStatusPerson({ person_id, status: "KB", manager_id });
};
