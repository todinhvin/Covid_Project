const db = require("./db");

const tableName = "public.account";

exports.getAccount = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows[0];
};

exports.getPaymentHistory = async() => {
    const { rows } = await db.query(`select * from public.payment_history`)

    return rows;
}

exports.convertDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
};
  