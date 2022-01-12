const db = require("../db");
const tableName = "public.package_item";

exports.delRowPackItemByItemId = async(idItem) => {


    const { rows } = await db.query(
        `   DELETE FROM ${tableName}
            WHERE  "item_id" ='${idItem}' 
            Returning *;`
    )
    return rows;
}