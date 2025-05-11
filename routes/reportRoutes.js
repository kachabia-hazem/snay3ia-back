const express = require("express");
const router = express.Router();
const ReportController = require("../controller/reportController");
const { authV } = require("../controller/auth");

// Route to create a new report
router.post("/report", authV, ReportController.createReport);
router.get("/report/client", authV, ReportController.getClientReports);
router.get("/report/worker", authV, ReportController.getWorkerReports);
router.put("/report/:id/cancel", authV, ReportController.cancelReport);
router.put("/report/:id/consult", authV, ReportController.consultReport);

module.exports = router;
