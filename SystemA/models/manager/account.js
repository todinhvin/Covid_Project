const db = require("../db");

exports.createAccount = async (username,role_id=3,person_id) => {
    const {rows} = await db.query(
        'INSERT INTO account(username,role_id,person_id) values($1,$2,$3)',
        [username,role_id,person_id]
        );
    return rows[0];
}
