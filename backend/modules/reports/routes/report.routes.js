const router = require("express").Router();
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const { GET_ALL_REPORTS, ADD_REPORT, DEL_REPORT } = require("../endPoint");
const {
  getAllReports,
  createReport,
  deleteReport,
  editReport,
  getMyReports,
} = require("../controllers/reportControl");

router.get(
  "/getAllReports",
  /*isAuthoraized(GET_ALL_REPORTS), */ getAllReports
);
router.get("/getAllReports/MyReports/:id", getMyReports);
router.post("/createReport", /*isAuthoraized(ADD_REPORT), */ createReport);
router.delete(
  "/deleteReport/:id",
  /*isAuthoraized(DEL_REPORT), */ deleteReport
);
router.patch("/editReport/:id", editReport);

module.exports = router;
