import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const result = await contactsService.listContacts(ownerId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const { id } = req.params;
        const result = await contactsService.getContactById(id, ownerId);
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
        const ownerId = req.user._id;
        const { id } = req.params;
        const result = await contactsService.removeContact(id, ownerId);
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
        const ownerId = req.user._id;
        const result = await contactsService.addContact(req.body, ownerId);

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
        const ownerId = req.user._id;
        const { id } = req.params;
        const result = await contactsService.updateContact(id, req.body, ownerId);
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
        const ownerId = req.user._id;
        const { id } = req.params;
        const result = await contactsService.updateStatus(id, req.body, ownerId);
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