const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({ 
        email:Joi.string().email().required(),
        accounts: Joi.array().items(Joi.object({
            kind:Joi.string(),
            uid:Joi.string(),
            password:Joi.string(),
        })),
        events:Joi.array().items(Joi.object({
            eventName:Joi.string(),
            eventDate:Joi.string(),
            moment:Joi.string()
        }))
    });
    return schema.validate(data);    
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(data);    
}

module.exports = {
    registerValidation : registerValidation,
    loginValidation : loginValidation
}