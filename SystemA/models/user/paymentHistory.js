const db = require("../db");

const tableName = 'public.payment_history';

exports.getPaymentHistory = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};

exports.createPaymentHistory = async(account_id, payment_on, total_money) => {
    const { rows } = await db.query('INSERT INTO payment_history(account_id,payment_on,total_money) VALUES($1,$2,$3)', [account_id, payment_on, total_money])
    return rows[0];
}