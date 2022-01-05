const db = require("../db");

const tableName = 'public.status_history';

exports.getStatusHistory = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};