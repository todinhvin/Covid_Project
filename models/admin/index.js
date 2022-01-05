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
	    username, password, status, role_id, person_id, indebt_id)
	    VALUES ('${username}', '${password}', 'single', 2, null, null)`
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
    `SELECT * FROM public.status_history
      WHERE manager_id = ${manager_id}
      ORDER BY status_history_id DESC`
  );
  return rows;
};

exports.getTreatmentHistoryByManagerId = async (manager_id) => {
  const { rows } = await db.query(
    `SELECT treatment_history_id, treatment_id, person_id, "time", manager_id
	    FROM public.treatment_history
      WHERE manager_id = ${manager_id}
      ORDER BY treatment_history_id DESC`
  );
  return rows;
};

exports.createTreatment = async (name, capacity) => {
  const { rowCount } = await db.query(
    `INSERT INTO public.treatment(
	  name, capacity)
	  VALUES ('${name}', ${capacity});`
  );
  return rowCount === 1;
};

exports.countPersonByTreatmentId = async (treatment_id) => {
  const { rows } = await db.query(
    `SELECT count(*)
	  FROM public.treatment_history as th WHERE time = (SELECT MAX(time) from public.treatment_history 
	  where person_id = th.person_id) AND treatment_id = ${treatment_id}`
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
    `SELECT th.treatment_id, tm."name", tm.capacity, count(person_id) as current_capacity
	  FROM public.treatment_history as th, public.treatment as tm
	  WHERE time = (SELECT MAX(time) from public.treatment_history 
	  where person_id = th.person_id) and tm.treatment_id = th.treatment_id
	  group by (th.treatment_id, tm."name", tm.capacity)`
  );
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
  };
};
