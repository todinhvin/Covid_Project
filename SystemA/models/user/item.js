const db = require("../db");

const tableName = 'public.item';

exports.getItem = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows[0];
};