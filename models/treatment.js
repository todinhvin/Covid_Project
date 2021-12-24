const db = require("./db");

exports.getAllTreatments = async () => {
  const { rows } = await db.query('SELECT * FROM public."treatment"');
  return rows;
};
