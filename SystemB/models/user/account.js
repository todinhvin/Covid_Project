const db = require("../db");

const tableName = "public.account";

exports.getAccount = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows[0];
};

exports.setPassword = async(username, password) => {
    const { rows } = await db.query(
        "UPDATE account set password = $1 where username=$2 returning *", [password, username]
    );
    return rows[0];
};

exports.changeStateAccount = async(username, state) => {
    await db.query(
        "UPDATE account set state = $1 where username=$2 ", [state, username]
    );
};

exports.addAccount = async(username) => {
    await db.query(
        "INSERT INTO account(username) values($1) ", [username]
    );
};

exports.getStateAccount = async(username) => {
    const { rows } = await db.query(
        "select state from account where username=$1", [username]
    );
    return rows[0].state;
};

exports.changeAccount = async(
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

<<<<<<< HEAD


exports.addPaymentHis = async ({username,total_money,payment_time,package_name}) => {
  try{
    const {rows} = await db.query(
      "INSERT INTO accoupayment_historynt(username,total_money,payment_time,package_name) values($1,$2,$3,$4) ",
      [username,total_money,payment_time,package_name]
    );
    return rows[0];
  }catch(error) {
    return
  }
=======
exports.createAdminAccount = async(username, password) => {
    const { rows } = await db.query(
        `INSERT INTO public.account(
          username, password, role, account_balance, state)
          VALUES ('${username}', '${password}', 'admin', '0', 'unlock');`
    );
    return rows[0];
>>>>>>> 08bd09eece9fdad71d6dc873200ded8397227441
};