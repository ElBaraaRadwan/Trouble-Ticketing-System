const router = require("express").Router();
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const { ADD_FEEDBACK, GET_ALL_FEEDBACKS } = require("../endPoint");
const {
  getAllFeedBacks,
  createFeedBack,
} = require("../controllers/feedbackControl");

router.get(
  "/getAllFeedBack",
  /*isAuthoraized(GET_ALL_FEEDBACKS), */
  getAllFeedBacks
);
router.post("/createFeedBack", /*isAuthoraized(ADD_FEEDBACK), */ createFeedBack);

module.exports = router;
