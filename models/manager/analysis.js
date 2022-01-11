const db = require("../db");
const { getAllPackage, getAllItems } = require("./package");
exports.getTotalPatientsByDay = async ({ day, status }) => {
  const { rows } = await db.query(
    'select count(*) from status_history join person on person."person_id"= status_history.person_id where abs(now() :: date - time :: date)<=$1 and person."status"=$2',
    [day, status]
  );
  return rows[0].count;
};

exports.getTotalStatusChangeByDay = async ({ status1, status2, day }) => {
  const { rows } = await db.query(
    'select count(*) from "status_history" as s1 join "status_history" as s2 on s1.person_id =s2.person_id where s2.status !=s1.status and s1.status=$1 and s2.status=$2 and abs(s2.time :: date - s1.time :: date)<=$3',
    [status1, status2, day]
  );
  return rows[0].count;
};

exports.analysisPackages = async ({ day }) => {
  const packages = await getAllPackage();
  for (let i = 0; i < packages.length; i++) {
    const { rows } = await db.query(
      "select count(*) from (select distinct account_id,package_id,checkout_date from checkout where abs(now() :: date - checkout_date :: date)<=$1 and package_id=$2) as X",
      [day, packages[i].package_id]
    );
    Object.assign(packages[i], { count: rows[0].count });
  }
  const items = await getAllItems();
  for (let i = 0; i < items.length; i++) {
    const { rows } = await db.query(
      "select count(*) from checkout where  abs(now() :: date - checkout_date :: date)<=$1 and item_id=$2",
      [day, items[i].item_id]
    );
    Object.assign(items[i], { count: rows[0].count });
  }
  return { packages, items };
};

exports.analysisPayment = async ({ day }) => {
  const totalUsersInDebt = await getTotalUserInDebt(day);
  const totalDebt = await getTotalDebt(day);
  const totalPaid = await getTotalPaid(day);

  return { totalUsersInDebt, totalDebt, totalPaid };
};

const getTotalUserInDebt = async (day) => {
  const { rows } = await db.query(
    "select count(*) from (select distinct account_id from indept where status is null and abs(now() :: date - due_date :: date)<=$1) as A",
    [day]
  );
  return rows[0].count;
};

const getTotalDebt = async (day) => {
  const { rows } = await db.query(
    "select sum(indept) from indept where abs(now() :: date - due_date :: date)<=$1",
    [day]
  );
  return rows[0].sum;
};

const getTotalPaid = async (day) => {
  const { rows } = await db.query(
    "select sum(total_money) from payment_history where abs(now() :: date - payment_on :: date)<=$1",
    [day]
  );
  return rows[0].sum;
};
