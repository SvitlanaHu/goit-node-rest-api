import * as contactsService from "../services/contactsServices.js";
import {
    createContactSchema,
    updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json({
            status: "success",
            code: 200,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json({
            status: "success",
            code: 200,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json({
            status: "success",
            code: 200,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body);
        if (error) throw HttpError(400, error.message);

        const result = await contactsService.addContact(req.body);

        res.status(201).json({
            status: "success",
            code: 201,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const result = await contactsService.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404);
        }

        return res.json({
            status: "success",
            code: 200,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};