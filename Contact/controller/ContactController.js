const ContactModel = require("../model/ContactModel");
const { createFactory, getByIdFactory, getAllFactory, deleteByIdFactory } = require("../../Shared/utility/crudFactory");

const createContactHandler = createFactory(ContactModel);
const getAllContactHandler = getAllFactory(ContactModel);
const getContactByIdHandler = getByIdFactory(ContactModel);
const deleteContactByIdHandler = deleteByIdFactory(ContactModel)


module.exports = {
    createContactHandler,
    getAllContactHandler,
    getContactByIdHandler,
    deleteContactByIdHandler
}