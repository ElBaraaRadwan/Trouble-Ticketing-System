const {
    getAllUsers,
    sign_up,
    getUser,
    deleteUser,
    updateUserName,
    sign_in,
} = require("../controller/user.controller");
// const {
//     getAllAgents,
//     agent_sign_up,
//     getAgent,
//     deleteAgent,
//     updateAgent,
//     agent_sign_in,
// } = require("../controller/admin.controller");
const validateRequest = require("../../../common/middleware/validateRequest");
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const { addUserSchema, singInSchema, addadminSchema, agentsingInSchema } = require("../joi/userValidation");
const { GET_ALL_USERS, GET_ALL_AGENTS, ADD_AGENTS, DELETE_USERS, UPDATE_USERS, DELETE_AGENT, UPDATE_AGENT } = require("../endPoint");

const router = require("express").Router();

router.get("/users", /*isAuthoraized(GET_ALL_USERS),*/ getAllUsers);
// router.get("/agents", isAuthoraized(GET_ALL_AGENTS), getAllAgents);
router.post("/addUser", validateRequest(addUserSchema), sign_up);
// router.post("/addagent", isAuthoraized(ADD_AGENTS), validateRequest(addadminSchema), agent_sign_up);
router.post("/signIn", validateRequest(singInSchema), sign_in);
// router.post("/agentsignIn", validateRequest(agentsingInSchema), agent_sign_in);
router.delete("/deleteUser/:id", isAuthoraized(DELETE_USERS), deleteUser);
router.patch("/updateUser/:id", isAuthoraized(UPDATE_USERS), updateUserName);
// router.delete("/deleteAgent/:id", isAuthoraized(DELETE_AGENT), deleteAgent);
// router.patch("/updateAgent/:id", isAuthoraized(UPDATE_AGENT), updateAgent);



module.exports = router;