const { StatusCodes } = require("http-status-codes");
module.exports = (schema) => {
    return (req, res, next) => {
        const validateArr = [];
        const validateResult = schema.body.validate(req.body);
        // console.log(validateResult.error);
        if (validateResult.error) {
            validateArr.push(validateResult.error.details[0].message);
        }
        if (validateArr.length) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: validateArr.join() });
            return;
        } else {
            next();
        }
    };
};