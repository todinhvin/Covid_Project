const db = require("../db");

const tableName = 'public.account';

exports.getAccount = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows[0];
};

exports.changeAccount = async(IdentifyField, IdentifyValue, fieldName, value) => {
    const { rows } = await db.query(
        `UPDATE ${tableName}
        SET "${fieldName}"='${value}'
        WHERE "${IdentifyField}"='${IdentifyValue}';`
    );
    return rows[0];
};

exports.createAdminAccount = async(username, password) => {
    const { rows } = await db.query(
        `INSERT INTO public.account(
            username, password, status, role_id, person_id)
            VALUES ('${username}', '${password}', 'active', '1', null);`
    );
    return rows[0];
};

exports.updateUserAccount = async(username, password) => {
    const { rows } = await db.query(
        `UPDATE public.account
        SET password='${password}'
        WHERE username = '${username}';`
    );
    return rows[0];
};

exports.getPatientByCCCD = async(cccd) => {
    const { rows } = await db.query('SELECT * FROM person where "cccd" =$1 ', [
        cccd,
    ]);
    return rows[0];
};