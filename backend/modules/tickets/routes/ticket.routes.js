const router = require("express").Router();
// const isAuthoraized = require('../../../common/middleware/isAuthoraized')
//const { GET_ALL_TICKETS, GET_TICKET, ADD_TICKET, UPDATA_TICKET, DEL_TICKET, ASSIGN_TICKET, SOLVE_TICKET} = require('../endPoint')
const { uploadTicket } = require('../../../middlewares/Storge')

const {
    getAllTickets,
    getTicket,
    createTicket,
    replyTicket,
    deleteTicket,
    assignTicket,
    solveTicket,
    getMyTickts,
} = require("../controllers/ticketControl");

router.get("/getAllTicket", /*isAuthoraized(GET_ALL_TICKETS),*/ getAllTickets);
router.get("/getAllTicket/myTicket/:id", getMyTickts);
router.post('/createTicket', /*isAuthoraized(ADD_TICKET),*/ uploadTicket.array('attachment'), createTicket);
router.get("/getTicket/:id", /*isAuthoraized(GET_TICKET),*/ getTicket); // get a single ticket
router.patch("/replyTicket/:id", /*isAuthoraized(UPDATA_TICKET), */ replyTicket);
router.patch("/assignTicket/:id", /*isAuthoraized(ASSIGN_TICKET), */ assignTicket);
router.patch("/solveTicket/:id", /*isAuthoraized(SOLVE_TICKET), */ solveTicket);
router.delete("/deleteTicket/:id", /*isAuthoraized(DEL_TICKET), */ deleteTicket);

module.exports = router;