const router = require("express").Router();
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const { ADD_FAQS, DEL_FAQS, UPDATE_FAQS} = require('../endPoint')
const {uploadFAQs} = require('../../../middlewares/Storge')

const {
  getAllFAQs,
  getFAQs,
  createFAQs,
  updateFAQs,
  deleteFAQs,
} = require("../controllers/FAQsControl");

router.get("/getAllFAQs", getAllFAQs);
router.get("/getFAQs/:id", getFAQs); // get a single FAQ
router.patch("/updateFAQs/:id", /*isAuthoraized(UPDATE_FAQS), */ updateFAQs);
router.delete("/deleteFAQs/:id", /*isAuthoraized(DEL_FAQS), */ deleteFAQs);
router.post("/createFAQs", /*isAuthoraized(ADD_FAQS), */uploadFAQs.array('attachment'), createFAQs);

module.exports = router;
