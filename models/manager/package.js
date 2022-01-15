const db = require("../db");

exports.getAllPackage = async() => {
    const { rows } = await db.query('SELECT * FROM public."package"');
    return rows;
};

exports.getAllItems = async() => {
    const { rows } = await db.query('SELECT * FROM public."item"');
    return rows;
};

const getTotalPackage = async() => {
    const { rows } = await db.query(`SELECT count(*) FROM public."package" WHERE "state"= 'true'`);
    return rows[0].count;
}

exports.getPackageByIdPack = async(idItem) => {
    const { rows } = await db.query(`SELECT * FROM public."package" WHERE "state"= 'true'
    AND "package_id" = '${idItem}'
    `);

    return rows;
}

exports.getPackages = async({ page = 1, per_page = 6, filter }) => {
        const offset = (page - 1) * per_page;
        const { rows } = await db.query(
                `SELECT PK.package_id,PK.name, PK.due_date,count(*) as amount
                FROM public.package_item IM 
                JOIN public."package" PK ON IM.package_id = PK.package_id 
                WHERE PK.state ='true'
                GROUP BY PK.package_id ,PK.name, PK.due_date
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