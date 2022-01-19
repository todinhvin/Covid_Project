const db = require("../db");

const tableName = "public.account";

exports.putMoneyAccount = async (username, balance_value) => {
  try {
    const { rows } = await db.query(
      "UPDATE account set account_balance = $1 where username=$2 returning *",
      [balance_value, username]
    );
    return rows[0];
  } catch (err) {
    return;
  }
};
