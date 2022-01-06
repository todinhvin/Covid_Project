const db = require('../db');

exports.getTotalPackage = async() => {
    const total = await db.query('select count(*) from package;')
    return total.rows[0];
}

exports.getAllPackage = async ({ page = 1, per_page = 6, filter }) => {
    const offset = (page - 1) * per_page;
    
    const pds = await db.query(`select p.package_id, p.name, 
    array(select it.name
          from package_item as pit inner join item as it on pit.item_id = it.item_id
          where pit.package_id = p.package_id) as itemlist,
    sum(i.price * pi.quantity) as price
from package as p inner join package_item as pi on p.package_id = pi.package_id
inner join item as i on pi.item_id = i.item_id
group by p.package_id
${filter ? `ORDER BY ${filter} ASC` : `ORDER BY p.package_id ASC`}`);
/*LIMIT ${per_page} OFFSET ${offset}`);*/

    const totalPk = await this.getTotalPackage();
    const totalPage = totalPk % per_page === 0
      ? totalPk / per_page
      : Math.floor(totalPk / per_page) + 1;

    return {
        totalPage: totalPage,
        Packages: pds.rows,
    }
}
/*
exports.getAllPackage = async () => {
    const pds = await db.query(`select p.package_id, p.name, 
    array(select it.name
          from package_item as pit inner join item as it on pit.item_id = it.item_id
          where pit.package_id = p.package_id) as itemlist,
    sum(i.price * pi.quantity) as price
from package as p inner join package_item as pi on p.package_id = pi.package_id
inner join item as i on pi.item_id = i.item_id
group by p.package_id
order by p.package_id`);

    return pds.rows;
}
*/

exports.getPackageBySearch = async ({ page = 1, per_page = 6, search }) => {
    const offset = (page - 1) * per_page;

    const pds = await db.query(`select p.package_id, p.name, 
    array(select it.name
          from package_item as pit inner join item as it on pit.item_id = it.item_id
          where pit.package_id = p.package_id) as itemlist,
    sum(i.price * pi.quantity) as price
from package as p inner join package_item as pi on p.package_id = pi.package_id
inner join item as i on pi.item_id = i.item_id
where p.name like '${search}%'
group by p.package_id;`);
/*LIMIT ${per_page} OFFSET ${offset}`);*/

    const totalPk = await this.getTotalPackage();
    const totalPage = totalPk % per_page === 0
      ? totalPk / per_page
      : Math.floor(totalPk / per_page) + 1;

    return {
        totalPage: totalPage,
        Packages: pds.rows,
    }
}

exports.getPackageById = async(id) => {
    const pd = await db.query(`select p.name, 
    sum(i.price * pi.quantity) as price
from package as p inner join package_item as pi on p.package_id = pi.package_id
inner join item as i on pi.item_id = i.item_id
where p.package_id = ${id}
group by p.package_id`);
    return pd.rows[0];
}

exports.getPackageDetail = async(id) => {
    const its = await db.query(`select i.item_id, i.name, i.image, i.price, i.unit, pi.quantity, pi.item_limit
    from package_item as pi
    inner join item as i on pi.item_id = i.item_id
    where pi.package_id = ${id}
    order by i.item_id;`);
    return its.rows;
}