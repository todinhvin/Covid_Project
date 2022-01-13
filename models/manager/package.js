const db = require("../db");

exports.getAllPackage = async() => {
    const { rows } = await db.query('SELECT * FROM public."package"');
    return rows;
};

exports.getAllItems = async() => {
    const { rows } = await db.query('SELECT * FROM public."item"');
    return rows;
};