const {
    ASSIGN_TICKET,
    GET_TICKET,
    GET_ALL_TICKETS,
} = require("../../../modules/tickets/endPoint");

const { GET_ALL_REPORTS } = require("../../../modules/reports/endPoint");

const { GET_ALL_FEEDBACKS } = require("../../../modules/feedback/endPoint");

const { GET_ALL_USERS, GET_ALL_AGENTS, ADD_AGENTS, DELETE_USERS, UPDATE_USERS, DELETE_AGENT, UPDATE_AGENT } = require("../../../modules/users/endPoint");


const {
    ADD_FAQS,
    DEL_FAQS,
    UPDATE_FAQS
} = require("../../../modules/FAQs/endPoint");

module.exports = [
    ADD_FAQS,
    DEL_FAQS,
    UPDATE_FAQS,
    GET_ALL_FEEDBACKS,
    ASSIGN_TICKET,
    GET_TICKET,
    GET_ALL_TICKETS,
    GET_ALL_REPORTS,
    GET_ALL_AGENTS,
    ADD_AGENTS,
    DELETE_USERS,
    UPDATE_USERS,
    GET_ALL_USERS,
    DELETE_AGENT,
    UPDATE_AGENT,
];