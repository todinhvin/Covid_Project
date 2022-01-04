const db = require("../db");

const tableName = 'public.person';

exports.allUser = async() => {
    const { rows } = await db.query(`SELECT * FROM ${tableName}`);
    return rows;
};

exports.getOneUser = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows[0];
};