const db = require("../db");

exports.getAllPackage = async() => {
    const { rows } = await db.query(`SELECT * FROM public."package" where "state" ='true'`);
    return rows;
};

exports.getAllItems = async() => {
    const { rows } = await db.query(`SELECT * FROM public."item" where "state" ='true'`);
    return rows;
};

const getTotalPackage = async() => {
    const { rows } = await db.query(`SELECT count(*) FROM public."package" WHERE "state"= 'true'`);
    return rows[0].count;
}

exports.getPackageByIdPack = async(idPack) => {
    const { rows } = await db.query(`SELECT * FROM public."package" WHERE "state"= 'true'
    AND "package_id" = '${idPack}'
    `);

    return rows;
}

exports.getPackages = async({ page = 1, per_page = 6, filter }) => {
        const offset = (page - 1) * per_page;
        const { rows } = await db.query(
                `SELECT PK.package_id,PK.name, date(due_date),count(*) as amount
                FROM public.package_item IM
                JOIN public."package" PK ON IM.package_id = PK.package_id, public.item IT
                WHERE IT.state ='true' and IT.item_id = IM.item_id and PK.state ='true'
                GROUP BY PK.package_id ,PK.name,PK.due_date
                ${filter ? `ORDER BY ${filter} ASC` : ""}
                LIMIT $1 OFFSET $2 
                `
                ,
    [per_page, offset]
  );

  const totalNec = await getTotalPackage();
  const totalPage =
    totalNec % per_page === 0
      ? totalNec / per_page
      : Math.floor(totalNec / per_page) + 1;

  return {
    totalPage: totalPage,
    packages: rows,
  };
};

// thêm một package mới
exports.addNewPack =async(name,due_date, created_on)=>{

  const {rows} = await db.query(
    `INSERT INTO  public."package"
    ("name","due_date","created_on","manager_id","state")
    Values('${name}','${due_date}','${created_on}',2,true)
    Returning* `
  )

  return rows;
}

// update một packages
exports.updatePack =async(id,name,due_date, created_on)=>{

  const {rows} = await db.query(
    `UPDATE  public."package"
     SET "name" = '${name}',"due_date" = '${due_date}',"created_on" = '${created_on}'
     WHERE "package_id" ='${id}'
     Returning* `
  )

  return rows;
}

// xóa một package
exports.delItemByPackId = async(idPack) => {


  const { rows } = await db.query(
      `   UPDATE public."package"
          SET "state" ='false'
          WHERE  "package_id" ='${idPack}' 
          Returning *;`
  )
  return rows;
}

exports.getPackByName = async(idPack,name) => {

  const { rows } = await db.query(`SELECT * FROM public."package" 
    WHERE  "name" = '${name}' and "package_id" = '${idPack}' and "state"= 'true'
    `);

    return rows;
}