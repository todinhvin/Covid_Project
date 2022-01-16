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

exports.delItemInPack = async(idPackage, idItem) => {

    const { rows } = await db.query(
        `
        DELETE FROM ${tableName}
        WHERE "package_id" ='${idPackage}'
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

exports.getItemById = async(idPack, idItem) => {

    const { rows } = await db.query(
        `SELECT * FROM ${tableName}
         WHERE "package_id" ='${idPack}' AND "item_id" ='${idItem}'
        `
    )

    return rows;
}

exports.updateItemInPack = async(idPack, idItem, quantity, limit) => {

    const { rows } = await db.query(
        `UPDATE ${tableName}
        SET "quantity" ='${quantity}', "item_limit"='${limit}'
        WHERE  "package_id" ='${idPack}' AND "item_id" ='${idItem}'
        Returning* 
       `
    )

    return rows;
}