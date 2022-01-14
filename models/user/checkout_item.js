const db = require("../db");

const tableName = 'public.checkout_item';

exports.getCheckoutItem = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};