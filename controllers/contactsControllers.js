import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
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

export const updateStatusContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await contactsService.updateStatus(id, req.body);
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