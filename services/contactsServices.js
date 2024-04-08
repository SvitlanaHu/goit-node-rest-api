import Contact from "../models/Contact.js";

export const listContacts = () => {
    return Contact.find();
}

export async function getContactById(id) {
    return Contact.findById(id);
}

export async function removeContact(id) {
    return Contact.findByIdAndDelete(id);
}

export async function addContact(body) {
    return Contact.create(body);
}

export async function updateContact(id, body) {
    return Contact.findByIdAndUpdate(id, body, {
        new: true,
    });
}

export async function updateStatus(id, body) {
    return Contact.findByIdAndUpdate(id, body, {
        new: true,
    });
}