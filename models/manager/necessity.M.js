const db = require("../db");

// đếm tổng số lượng nhu yếu phẩm
const getTotalNec = async () => {
  const { rows } = await db.query(`SELECT count(*) FROM item `);

  return rows[0].count;
};

// lấy thông tin nhu yếu phẩm và hiển thị với số myp 1 page là 6
exports.getNecessities = async ({ page = 1, per_page = 6, filter }) => {
  const offset = (page - 1) * per_page;
  const { rows } = await db.query(
    `SELECT * FROM item 
    ${filter ? `ORDER BY ${filter} ASC` : ""}
    LIMIT $1 OFFSET $2`,
    [per_page, offset]
  );

  const totalNec = await getTotalNec();
  const totalPage =
    totalNec % per_page === 0
      ? totalNec / per_page
      : Math.floor(totalNec / per_page) + 1;

  return {
    totalPage: totalPage,
    items: rows,
  };
};

// thêm mới nhu yếu phẩm vào trong database
exports.addNewNecs = async (
  name,
  image,
  price,
  unit,
  created_on,
  manager_id
) => {
  const { rows } = await db.query(
    `
        INSERT INTO public.item
        ("name","image","price","unit","created_on","manager_id")
        VALUES('${name}','${image}','${price}','${unit}','${created_on}','${manager_id}')
        Returning *;`
  );

  return rows;
};
