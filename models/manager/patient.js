const db = require("../db");

const { getAddressByID } = require("./address");
const { getTreatmentByID } = require("./treatment");
const { addStatusPerson, getStatusHPerson } = require("./status_history");
const {
  addTreatmentPerson,
  getTreatmentsHPerson,
} = require("./treatment_history");

const getTotalPatients = async () => {
  const { rows } = await db.query(
    "SELECT COUNT(*) FROM person WHERE status!=$1",
    ["KB"]
  );
  return rows[0].count;
};

const getTotalPatientsKB = async () => {
  const { rows } = await db.query(
    "SELECT COUNT(*) FROM person WHERE status!=$1",
    ["KB"]
  );
  return rows[0].count;
};

exports.getPatients = async ({ page = 1, per_page = 6, filter }) => {
  const offset = (page - 1) * per_page;
  const { rows } = await db.query(
    `SELECT * FROM person  WHERE status!=$1  ${
      filter ? `ORDER BY ${filter} ASC` : ""
    } LIMIT $2 OFFSET $3`,
    ["KB", per_page, offset]
  );
  const patients = await getDetailsPatients(rows);
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

const getDetailsPatients = async (data) => {
  for (let i = 0; i < data.length; i++) {
    const addressO = await getAddressByID(data[i].address_id);
    const treamentO = await getTreatmentByID(data[i].treatment_id);
    let relatedPerson = "Chưa xác định được";
    if (data[i].related_person_id > -1) {
      related = await getPatientById(data[i].related_person_id);
      relatedPerson = related.full_name + "  " + "cccd: " + related.cccd;
    }

    Object.assign(data[i], {
      address: `${addressO.xa}-${addressO.huyen}-${addressO.tinh}`,
      treatment: treamentO.name,
      related_person: relatedPerson,
    });
  }
  return data;
};

exports.getPatientsBySearch = async ({ page = 1, per_page = 6, search }) => {
  const offset = (page - 1) * per_page;
  const { rows } = await db.query(
    `SELECT * FROM person  WHERE "full_name" LIKE $1 OR "cccd" LIKE $2 LIMIT $3 OFFSET $4`,
    [`${search}%`, `${search}%`, per_page, offset]
  );
  const patients = await getDetailsPatients(rows);
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

exports.getPatientsKB = async ({ page, per_page = 6, filter }) => {
  const offset = (page - 1) * per_page;
  const { rows } = await db.query(
    `SELECT * FROM person  WHERE status=$1 ${
      filter ? `ORDER BY ${filter} ASC` : ""
    } LIMIT $2 OFFSET $3`,
    ["KB", per_page, offset]
  );

  const totalPatients = await getTotalPatientsKB();
  const totalPage =
    totalPatients % per_page === 0
      ? totalPatients / per_page
      : Math.floor(totalPatients / per_page) + 1;
  const patients = await getDetailsPatients(rows);

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

exports.getDetailsPatientById = async (patient_id) => {
  const patient = await getPatientById(patient_id);
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
  const statusHis = await getStatusHPerson(patient_id);
  const treatmentHis = await getTreatmentsHPerson(patient_id);
  return {
    patient,
    statusHis,
    treatmentHis,
  };
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
