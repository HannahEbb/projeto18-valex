import joi from "joi";

const activationSchema = joi.object({
    id: joi.number().required().messages({
        "any.required": "Card Id, password and security code required!"
    }),
    yourPassword: joi.string().length(4).required().messages({
        "any.required": "Card Id, password and security code required!"
    }),
    securityCode: joi.number().required().messages({
        "any.required": "Card Id, password and security code required!"
    })
});

export default activationSchema;