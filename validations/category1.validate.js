const Joi = require("joi");

const category1Validation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(55).required(),
    });
    return schema.validate(data);
};

module.exports = category1Validation