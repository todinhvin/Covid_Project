const db = require("../db");

const { getTreatment } = require("./treatment");

const tableName = 'public.treatment_history';

exports.getTreatmentHistory = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );

    rows.forEach(async(row) => {
        const treatment = await getTreatment("treatment_id", row.treatment_id);
        Object.assign(row, {
            treatment_name: treatment.name,
        })
    });

    return rows;
};