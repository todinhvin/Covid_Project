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

exports.createUserAccount = async(username, password, person_id) => {
    const { rows } = await db.query(
        `INSERT INTO public.account(
            username, password, status, role_id, person_id)
            VALUES ('${username}', '${password}', 'active', '3', '${person_id}');`
    );
    return rows[0];
};