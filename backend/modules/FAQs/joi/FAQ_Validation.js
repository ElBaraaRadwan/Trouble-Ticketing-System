const Joi = require("joi");

module.exports = {
  add_FAQ_Schema: {
    body: Joi.object().required().keys({
      header: Joi.string().required(),
      constent: Joi.string().required(),
      department: Joi.string().required(),
    }),
  },
  update_FAQ_Schema: {
    params: Joi.object().required().keys({
      id: Joi.string(),
    }),
    body: Joi.object().required().keys({
      header: Joi.string().required(),
      constent: Joi.string().required(),
      department: Joi.string().required(),
    }),
  },
};
