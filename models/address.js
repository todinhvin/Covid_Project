const db = require("./db");

exports.getAllAddresses = async () => {
  const { rows } = await db.query('SELECT * FROM public."address"');
  return rows;
};

exports.getAddressByID = async (address_id) => {
  const { rows } = await db.query(
    'SELECT * FROM PUBLIC."address" WHERE address_id =$1',
    [address_id]
  );
  return rows[0];
};
