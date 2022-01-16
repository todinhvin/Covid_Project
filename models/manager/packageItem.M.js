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

exports.countItemByIdPack = async(idPackge) => {


    const { rows } = await db.query(
        `SELECT COUNT(*) FROM ${tableName}
            WHERE  "package_id" ='${idPackge}' 
            GROUP BY package_id
            ;`
    )
    return rows[0].count;
}

exports.getItemByIdPack = async(idPackge) => {

    const { rows } = await db.query(
        `SELECT * FROM ${tableName}
            WHERE  "package_id" ='${idPackge}'
            ;`
    )

    return rows;
}

exports.delItemInPack = async(idPakage, idItem) => {

    const { rows } = await db.query(
        `
        DELETE FROM ${tableName}
        WHERE "package_id" ='${idPakage}'
        AND "item_id" ='${idItem}'
        Returning*
        `
    )

    return rows;
}


exports.addItemInPack = async(idPack, idItem, quantity, limit) => {

    const { rows } = await db.query(
        `INSERT INTO  ${tableName}
        ("package_id","item_id","quantity","item_limit")
        Values('${idPack}','${idItem}','${quantity}','${limit}')
        Returning* `
    )

    return rows;
}