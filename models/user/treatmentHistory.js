const db = require("../db");

const tableName = 'public.treatment_history';

exports.getTreatmentHistory = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};