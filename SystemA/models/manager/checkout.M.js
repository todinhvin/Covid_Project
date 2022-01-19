const db = require("../db");
const tableName = "public.checkout";

exports.delRowCheckOutByItemId = async(idItem) => {


    const { rows } = await db.query(
        `   DELETE FROM ${tableName}
            WHERE  "item_id" ='${idItem}' 
            Returning *;`
    )


    return rows;
}