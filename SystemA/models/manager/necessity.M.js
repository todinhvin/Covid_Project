const db = require("../db");

// đếm tổng số lượng nhu yếu phẩm
const getTotalNec = async() => {
    const { rows } = await db.query(`SELECT count(*) FROM item where "state" ='true'`);

    return rows[0].count;
};

exports.getAllItems = async() => {
    const { rows } = await db.query(`SELECT * FROM item where "state" ='true'`);

    return rows;
};
// lấy thông tin nhu yếu phẩm và hiển thị với số myp 1 page là 6
exports.getNecessities = async({ page = 1, per_page = 6, filter }) => {
        const offset = (page - 1) * per_page;
        const { rows } = await db.query(
                `SELECT * FROM item  WHERE "state" ='true'
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
        ("name","image","price","unit","created_on","manager_id","state")
        VALUES('${name}','${image}','${price}','${unit}','${created_on}','${manager_id}','true')
        Returning *;`
  );

  return rows;
};

// tìm dữ liệu package bằng id

exports.getNecsById = async (id) =>{

  const {rows} = await db.query(
    `
    SELECT * 
    FROM public.item
    WHERE "item_id" = '${id}' and "state" ='true' 
    `
  )
  return rows;
}

// tìm dữ liệu package bằng id

exports.getNecsByName = async (name) =>{

  const {rows} = await db.query(
    `
    SELECT * 
    FROM public.item
    WHERE "name" = '${name}' 
    `
  )
  return rows;
}


// Update một sản phẩm mới
exports.updateNecs = async (id,name,price,unit,created_on,manager_id) => {
  
  const { rows } = await db.query(
    `
        UPDATE public.item
        SET "name" = '${name}',"price" = '${price}',"unit" = '${unit}',"created_on" = '${created_on}',
        "manager_id" = '${manager_id}'
        WHERE  "item_id" ='${id}' 
        Returning *;`
  )
  return rows;
}

exports.getNecsByPackId = async (idPackage) =>{

  const {rows} = await db.query(
    `
    select * 
    from package_item PI 
    join item IM ON PI.item_id = IM.item_id AND IM.state ='true'
    where PI.package_id ='${idPackage}'
    ORDER BY PI.item_id ASC
    `
  )

  return rows;
}


exports.delItemByItemId = async(idItem) => {


  const { rows } = await db.query(
      `   UPDATE public.item
          SET "state" ='false'
          WHERE  "item_id" ='${idItem}' 
          Returning *;`
  )
  return rows;
}