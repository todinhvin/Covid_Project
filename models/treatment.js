const db = require("./db");

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
