const {
  UPDATA_TICKET,
  DEL_TICKET,
  ADD_TICKET,
} = require("../../../modules/tickets/endPoint");

const { ADD_FEEDBACK } = require("../../../modules/feedback/endPoint");

module.exports = [
  ADD_FEEDBACK,
  UPDATA_TICKET,
  DEL_TICKET,
  ADD_TICKET,
];
