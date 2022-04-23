const router = require("express").Router();
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const { GET_ALL_REPORTS, ADD_REPORT, DEL_REPORT } = require("../endPoint");
const { getAllReports, createReport, deleteReport } = require("../controllers/reportControl");

router.get("/getAllReports", /*isAuthoraized(GET_ALL_REPORTS), */ getAllReports);
router.post("/createReport", /*isAuthoraized(ADD_REPORT), */ createReport);
router.delete("/deleteReport/:id", /*isAuthoraized(DEL_REPORT), */ deleteReport);

module.exports = router;
