const db = require('../db');

exports.getAllProduct = async () => {
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

exports.getPackage = async(id) => {
    const pd = await db.query(`select p.name, 
    sum(i.price * pi.quantity) as price
from package as p inner join package_item as pi on p.package_id = pi.package_id
inner join item as i on pi.item_id = i.item_id
where p.package_id = ${id}
group by p.package_id`);
    return pd.rows[0];
}

exports.getItemsInPackage = async(id) => {
    const its = await db.query(`select i.item_id, i.name, i.image, i.price, i.unit, pi.quantity, pi.item_limit
    from package_item as pi
    inner join item as i on pi.item_id = i.item_id
    where pi.package_id = ${id}
    order by i.item_id;`);
    return its.rows;
}