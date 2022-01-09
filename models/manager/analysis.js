const db = require("../db");

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
