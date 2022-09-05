import joi from "joi";

const blockUnblockSchema = joi.object({
    id: joi.number().required().messages({
        "any.required": "Card Id and password required!"
    }),
    yourPassword: joi.string().length(4).required().messages({
        "any.required": "Card Id and password required!"
    })
});

export default blockUnblockSchema;