const db = require("../db");

exports.getAllTreatments = async () => {
  const { rows } = await db.query('SELECT * FROM public."treatment"');
  return rows;
};
exports.getTreatmentByID = async (treatment_id) => {
  const { rows } = await db.query(
    'SELECT * FROM PUBLIC."treatment" WHERE treatment_id =$1',
    [treatment_id]
  );
  return rows[0];
};

exports.getCapacityTreamentByID = async (treatment_id) => {
  const { rows } = await db.query(
    'SELECT capacity FROM PUBLIC."treatment" WHERE treatment_id =$1',
    [treatment_id]
  );
  return rows[0].capacity;
};

exports.getCurrentPatientsContain = async (treatment_id) => {
  const { rows } = await db.query(
    'SELECT count(*) FROM PUBLIC."person" WHERE treatment_id =$1 and status!=$2',
    [treatment_id, "KB"]
  );
  return rows[0].count;
};
