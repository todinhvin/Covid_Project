const db = require("../db");

const { getPackage } = require("./package");
const { getItem } = require("./item");
const { getCheckoutItem } = require("./checkout_item");
const { getPackageItem } = require("./package_item");
const { bindComplete } = require("pg-protocol/dist/messages");
//const { checkout } = require("../../controllers/user/user.C");

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

exports.createCheckout = async(uid, pid, its) => {
    let createRes;

    let checkoutPrice = 0;
    for (let it of its) {
        checkoutPrice += it.quantity * it.price;
    }

    // Đoạn kiểm tra nếu có :V
    //console.log(checkoutPrice);

    // Tạo checkout
    let newCheckout = await db.query(`insert into public.checkout("account_id", "package_id", "checkout_date", "state")
    values (${uid}, ${pid}, Now(), false) returning *;`)
    newCheckout = newCheckout.rows[0];

    let checkoutId = newCheckout.checkout_id;

    // Tạo checkout_item
    for (let it of its) {
        let iid = it.item_id;
        let uiq = it.quantity;
        
        await db.query(`insert into public.checkout_item("checkout_id", "item_id", "user_quantity")
        values (${checkoutId}, ${iid}, ${uiq})`)
    }

    // Thêm checkout vào bảng indept
    let minimumPay = checkoutPrice*0.2;

    await db.query(`insert into public.indept("indept", "due_date", "account_id", "minimum_pay", "state")
    values (${checkoutPrice}, Now() + interval '1 year', ${uid}, ${minimumPay}, false)`);

    createRes = {
        state: 1, // Thanh toán thành công
        msg: "  Mua thành công. Đã thêm vào mục dư nợ.",
    }

    return createRes;
}