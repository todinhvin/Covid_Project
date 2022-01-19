const db = require("../db");

const tableName = 'public.package_item';

exports.getPackageItem = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};