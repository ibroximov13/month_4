const Joi = require("joi");

const product1Validation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(55).required(),
        price: Joi.number().integer().positive().required(),
        color: Joi.string().min(2).max(30).required(),
        category1_id: Joi.number().integer().positive().required()
    });
    return schema.validate(data);
};

module.exports = product1Validation