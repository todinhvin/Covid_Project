const db = require("../db");

const tableName = 'public.indept';

exports.getIndept = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};

exports.getTotalIndebt = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT sum("indept") FROM ${tableName} WHERE "${fieldName}" = '${value}' group by "${fieldName}"`
    );
    return rows[0].sum;
};