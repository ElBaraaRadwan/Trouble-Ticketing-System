const roles = require("../../enum/roles");
const adminPolicy = require("./adminPoicy");
const userPolicy = require("./userPolicy");
const agentPolicy = require("./agentpolicy");

const opts = {
    [roles.ADMIN]: {
        can: adminPolicy,
    },
    [roles.AGENT]: {
        can: agentPolicy,
    },
    [roles.USER]: {
        can: userPolicy,
    }
};


module.exports = opts