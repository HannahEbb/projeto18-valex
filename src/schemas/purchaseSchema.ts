import joi from "joi";

const purchaseSchema = joi.object({
    cardId: joi.number().required().messages({
        "any.required": "Card Id, password, business Id and purchase cost (amount) required!"
    }),
    yourPassword: joi.string().length(4).required().messages({
        "any.required": "Card Id, password, business Id and purchase cost (amount) required!"
    }),
    businessId: joi.number().required().messages({
        "any.required": "Card Id, password, business Id and purchase cost (amount) required!"
    }),
    amount: joi.number().required().messages({
        "any.required": "Card Id, password, business Id and purchase cost (amount) required!"
    })
});

export default purchaseSchema;