const db = require("../db");

const tableName = 'public.payment_history';

exports.getPaymentHistory = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};