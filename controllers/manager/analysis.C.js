const express = require("express");
const router = express.Router();
const {
  getTotalPatientsByDay,
  getTotalStatusChangeByDay,
} = require("../../models/manager/analysis");

router.get("/", async (req, res) => {
  const { filter } = req.query;
  let day;
  if (filter === "week") {
    day = 7;
  } else if (filter === "one_month") {
    day = 30;
  } else if (filter === "three_month") {
    day = 90;
  } else if (filter === "year") {
    day = 365;
  }
  const totalF0 = await getTotalPatientsByDay({ day, status: "F0" });
  const totalF1 = await getTotalPatientsByDay({ day, status: "F0" });
  const totalF2 = await getTotalPatientsByDay({ day, status: "F0" });
  const totalKB = await getTotalPatientsByDay({ day, status: "KB" });

  const totalChangeF21 = await getTotalStatusChangeByDay({
    status1: "F2",
    status2: "F1",
    day,
  });
  const totalChangeF10 = await getTotalStatusChangeByDay({
    status1: "F1",
    status2: "F0",
    day,
  });
  const totalChangeF0KB = await getTotalStatusChangeByDay({
    status1: "F0",
    status2: "KB",
    day,
  });
  res.render("manager/analysis/patient", {
    totalF0,
    totalF1,
    totalF2,
    totalKB,
    totalChangeF21,
    totalChangeF10,
    totalChangeF0KB,
    filter,
  });
});

module.exports = router;
