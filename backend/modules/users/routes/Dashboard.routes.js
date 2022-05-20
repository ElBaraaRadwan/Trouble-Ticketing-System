const router = require("express").Router();


const {Dashboard} = require('../controller/H_O.dashboard')
router.get("/H_O", Dashboard);

module.exports = router;