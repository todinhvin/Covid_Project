const db = require("../db");

exports.getStatusHPerson = async (person_id) => {
  const { rows } = await db.query(
    'SELECT * FROM "status_history" WHERE "person_id"=$1',
    [person_id]
  );
  return rows;
};

exports.addStatusPerson = async ({ person_id, status, manager_id }) => {
  const { rows } = await db.query(
    'INSERT INTO "status_history"("person_id","time","status","manager_id") VALUES ($1,$2,$3,$4) RETURNING *;',
    [person_id, new Date(), status, manager_id]
  );
  return rows[0];
};
