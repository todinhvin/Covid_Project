const db = require("./db");

exports.getAllAddresses = async () => {
  const { rows } = await db.query('SELECT * FROM public."address"');
  return rows;
};
