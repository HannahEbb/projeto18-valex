import joi from "joi";

const activationSchema = joi.object({
    id: joi.number().required().messages({
        "any.required": "Card id and card type required!"
    }),
    cardType: joi.string().valid('education','health', 'groceries', 'restaurants', 'transport').required().messages({
        "any.required": "Card id and card type required!"
    })
});

export default activationSchema;