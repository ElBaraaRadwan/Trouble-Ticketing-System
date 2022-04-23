const Joi = require("joi");

module.exports = {
    addUserSchema: {
        body: Joi.object().required().keys({
            name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            age: Joi.number(),
            role: Joi.string(),
        }),
    },
    addadminSchema: {
        body: Joi.object().required().keys({
            name: Joi.string().required(),
            last_name: Joi.string().required(),
            department: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            role: Joi.string(),
        }),
    },
    singInSchema: {
        body: Joi.object().required().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }),
    },
    agentsingInSchema: {
        body: Joi.object().required().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }),
    },
    updateUserSchema: {
        params: Joi.object().required().keys({
            id: Joi.string(),
        }),
        body: Joi.object().required().keys({
            name: Joi.string().required(),
        }),
    },
};