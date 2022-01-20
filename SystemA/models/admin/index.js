const db = require('../db');

exports.getAllManagers = async () => {
  const { rows } = await db.query(
    'SELECT * FROM public."account" Where role_id = 2'
  );
  return rows;
};

exports.createManager = async (username, password) => {
  try {
    const { rowCount } = await db.query(
      `INSERT INTO public.account(
	    username, password, status, role_id, person_id)
	    VALUES ('${username}', '${password}', 'active', 2, null)`
    );

    return rowCount === 1;
  } catch (err) {
    return false;
  }
};

exports.setManagerInactive = async (account_id) => {
  try {
    const { rowCount } = await db.query(
      `UPDATE public.account
	  SET status='inactive'
	  WHERE account_id = ${account_id};`
    );
    return rowCount === 1;
  } catch (err) {
    return false;
  }
};

exports.setManagerActive = async (account_id) => {
  try {
    const { rowCount } = await db.query(
      `UPDATE public.account
	  SET status='active'
	  WHERE account_id = ${account_id};`
    );
    return rowCount === 1;
  } catch (err) {
    return false;
  }
};

exports.getStatusHistoryByManagerId = async (manager_id) => {
  const { rows } = await db.query(
    `SELECT sh.*, ps.full_name
FROM public.status_history sh, person ps
      WHERE sh.manager_id = ${manager_id}
        and ps.person_id = sh.person_id
      ORDER BY status_history_id DESC;`
  );
  return rows;
};

exports.getTreatmentHistoryByManagerId = async (manager_id) => {
  const { rows } = await db.query(
    `SELECT tmh.treatment_history_id, tmh.treatment_id, tmh.person_id, tmh."time", tmh.manager_id, ps.full_name, tm.name
	    FROM public.treatment_history tmh, treatment tm, person ps
      WHERE tmh.manager_id = ${manager_id}
        and tmh.treatment_id = tm.treatment_id and ps.person_id = tmh.person_id
      ORDER BY treatment_history_id DESC`
  );
  return rows;
};

exports.createTreatment = async (name, capacity) => {
  const { rowCount } = await db.query(
    `INSERT INTO public.treatment(
	  name, capacity, manager_id)
	  VALUES ('${name}', ${capacity}, null);`
  );
  return rowCount === 1;
};

exports.countPersonByTreatmentId = async (treatment_id) => {
  const { rows } = await db.query(
    `SELECT count(*)
	  FROM public.person where treatment_id = ${treatment_id}`
  );
  const count = +rows[0].count;
  return count;
};

exports.countManager = async () => {
  const { rows } = await db.query(
    `SELECT count(*) as count FROM public.account
	  where role_id = 2`
  );
  const count = +rows[0].count;
  return count;
};

exports.countTreatment = async () => {
  const { rows } = await db.query(
    `SELECT count(*) as count FROM public.treatment`
  );
  const count = +rows[0].count;
  return count;
};

exports.getAllTreatments = async () => {
  const { rows } = await db.query(
    `select treatment_id, name, capacity,  username as manager
    from treatment tm full outer join account acc
    on tm.manager_id = acc.account_id
    where (treatment_id is not null) order by treatment_id asc`
  );
  for (const row of rows) {
    row['current_capacity'] = await this.countPersonByTreatmentId(
      row.treatment_id
    );
  }
  return rows;
};

exports.updateTreatmentCapacity = async (treatment_id, newCapacity) => {
  const current_capacity = await this.countPersonByTreatmentId(treatment_id);
  if (newCapacity < current_capacity) return false;
  const { rowCount } = await db.query(
    `UPDATE public.treatment
	  SET capacity=${newCapacity}
	  WHERE treatment_id = ${treatment_id}`
  );
  return rowCount === 1;
};

exports.updateTreatmentManager = async (treatment_id, manager_id) => {
  const { rowCount } = await db.query(
    `update treatment
set manager_id = ${manager_id}
where treatment_id = ${treatment_id};`
  );
  return rowCount === 1;
};

exports.searchManagerByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT account_id, username 
    from account where role_id = 2 and username LIKE $1`,
    ['%' + username + '%']
  );
  return rows;
};

exports.paginate = (list, pageIndex, pageSize) => {
  pageIndex = pageIndex ? pageIndex : 1;
  pageSize = pageSize ? pageSize : 10;
  const count = list.length;
  const totalPage = Math.ceil(count / pageSize);

  let data = [...list];
  data = data.splice((pageIndex - 1) * pageSize, pageSize);
  const hasNext = pageIndex !== totalPage;
  const hasPrevious = pageIndex !== 1;
  const indexList = [];
  for (let index = 1; index <= totalPage; index++) {
    indexList.push({ index: index, isCurrent: index === pageIndex });
  }
  return {
    data,
    pageIndex,
    pageSize,
    totalPage,
    hasNext,
    hasPrevious,
    indexList,
    next: pageIndex + 1,
    prev: pageIndex - 1,
  };
};
