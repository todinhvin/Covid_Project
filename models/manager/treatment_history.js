const db = require("../db");

exports.getTreatmentsHPerson = async (person_id) => {
  const { rows } = await db.query(
    'SELECT * FROM "treatment_history" WHERE "person_id"=$1'
  );
  return rows;
};

exports.addTreatmentPerson = async ({
  person_id,
  treatment_id,
  manager_id,
}) => {
  const { rows } = await db.query(
    'INSERT INTO "treatment_history"("person_id","time","treatment_id","manager_id") VALUES ($1,$2,$3,$4) RETURNING *;',
    [person_id, new Date(), treatment_id, manager_id]
  );
  return rows[0];
};
