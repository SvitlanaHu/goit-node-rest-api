import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
    phone: Joi.number().required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
    }),
    phone: Joi.number(),
}).min({ limit: 1 });