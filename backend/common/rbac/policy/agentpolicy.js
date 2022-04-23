const {
    SOLVE_TICKET,
    ADD_TICKET,
} = require("../../../modules/tickets/endPoint");
const {
    GET_MY_REPORTS,
    ADD_REPORT,
} = require("../../../modules/reports/endPoint");

const { GET_ALL_USERS, DELETE_USERS, UPDATE_USERS } = require("../../../modules/users/endPoint");


module.exports = [
    SOLVE_TICKET,
    ADD_TICKET,
    GET_MY_REPORTS,
    ADD_REPORT,
    GET_ALL_USERS,
    DELETE_USERS,
    UPDATE_USERS,
];