const db = require("../db");

const tableName = "public.account";

exports.getAccount = async (fieldName, value) => {
  const { rows } = await db.query(
    `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
  );
  return rows[0];
};

exports.setPassword = async (username, password) => {
  const { rows } = await db.query(
    "UPDATE account set password = $1 where username=$2 returning *",
    [password, username]
  );
  return rows[0];
};

exports.changeStateAccount = async (username, state) => {
  await db.query(
    "UPDATE account set state = $1 where username=$2 ",
    [state, username]
  );
};

exports.addAccount = async (username) => {
  await db.query(
    "INSERT INTO account(username) values($1) ",
    [username]
  );
};

exports.getStateAccount = async (username) => {
  const { rows } = await db.query(
    "select state from account where username=$1",
    [username]
  );
  return rows[0].state;
};

exports.changeAccount = async (
  IdentifyField,
  IdentifyValue,
  fieldName,
  value
) => {
  const { rows } = await db.query(
    `UPDATE ${tableName}
        SET "${fieldName}"='${value}'
        WHERE "${IdentifyField}"='${IdentifyValue}';`
  );
  return rows[0];
};
