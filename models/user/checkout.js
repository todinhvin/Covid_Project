const db = require("../db");

const { getPackage } = require("./package");
const { getItem } = require("./item");
const { getCheckoutItem } = require("./checkout_item");
const { getPackageItem } = require("./package_item");

const tableName = 'public.checkout';

exports.getCheckout = async(fieldName, value) => {
    const { rows } = await db.query(
        `SELECT * FROM ${tableName} WHERE "${fieldName}" = '${value}'`
    );

    rows.forEach(async(row) => {
        const package = await getPackage("package_id", row.package_id);

        Object.assign(row, {
            package_name: package.name,
        })
    });

    return rows;
};