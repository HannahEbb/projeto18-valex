import joi from "joi";

const rechargeSchema = joi.object({
    id: joi.number().required().messages({
        "any.required": "Card id and recharge amount required!"
    }),
    amount: joi.number().required().messages({
        "any.required": "Card id and recharge amount required!"
    })
});

export default rechargeSchema;