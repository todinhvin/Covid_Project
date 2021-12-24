const db = require("./db");

exports.getPatients = async ({ limit, offset = 4 }) => {
  const { rows } = await db.query("SELECT * FROM person LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);
  return rows;
};

exports.getPatientById = async (patient_id) => {
  const { rows } = await db.query(
    'SELECT * FROM person where "person_id" =$1 ',
    [patient_id]
  );
  return rows[0];
};

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
  return rows[0];
};
