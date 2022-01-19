const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
    getTotalPatientsByDay,
    getTotalStatusChangeByDay,
    analysisPackages,
    analysisPayment,
} = require("../../models/manager/analysis");

router.get("/", async(req, res) => {
    const { filter = "week" } = req.query;
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
    const totalF1 = await getTotalPatientsByDay({ day, status: "F1" });
    const totalF2 = await getTotalPatientsByDay({ day, status: "F2" });
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
    //   const totalPatients = Array[(totalF0, totalF1, totalF2, totalKB)];
    let totalPatients = [];
    totalPatients.push(totalF0, totalF1, totalF2, totalKB);
    let totalPatientsChange = [];
    totalPatientsChange.push(totalChangeF21, totalChangeF10, totalChangeF0KB);
    res.render("manager/analysis/patient", {
        totalPatients: JSON.stringify(totalPatients),
        totalPatientsChange: JSON.stringify(totalPatientsChange),
        filter,
        title: "Thống kê"
    });
});

router.get("/consume", async(req, res) => {
    const { filter = "week" } = req.query;
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
    const { packages, items } = await analysisPackages({ day });
    const namePackages = packages.map((item) => item.name);
    const amountPackages = packages.map((item) => +item.count);

    const nameItems = items.map((item) => item.name);
    const amountItems = items.map((item) => +item.count);
    res.render("manager/analysis/consume", {
        namePackages: JSON.stringify(namePackages),
        amountPackages: JSON.stringify(amountPackages),
        nameItems: JSON.stringify(nameItems),
        amountItems: JSON.stringify(amountItems),
        filter,
        title: "Thống kê sản phẩm tiêu thụ"
    });
});

router.get("/payment", async(req, res) => {
    const { filter = "week" } = req.query;
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
    const { totalUsersInDebt, totalDebt, totalPaid } = await analysisPayment({
        day,
    });
    res.render("manager/analysis/payment", {
        filter,
        totalUsersInDebt: totalUsersInDebt ? totalUsersInDebt : 0,
        totalDebt: totalDebt ? totalDebt : 0,
        totalPaid: totalPaid ? totalPaid : 0,
        title: "Thống kê thanh toán"
    });
});

module.exports = router;