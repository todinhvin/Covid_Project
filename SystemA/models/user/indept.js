const db = require("../db");

const tableName = 'public.indept';

exports.getIndept = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );
    return rows;
};

exports.changeStateIndept =async (indept_id,state) => {
    try{
        const {rows} = await db.query('UPDATE indept SET state=$1 WHERE indept_id=$2',[state,indept_id])
        return rows[0]
    }catch(err) {
        return
    }
}

exports.getTotalIndebt = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT sum("indept") FROM ${tableName} WHERE "${fieldName}" = '${value}' group by "${fieldName}"`
    );
    return rows[0].sum;
};