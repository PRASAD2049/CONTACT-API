const express = require('express');
const { createContactHandler, getAllContactHandler, getContactByIdHandler, deleteContactByIdHandler } = require('../controller/ContactController');
const { checkInput } = require('../../Common/controller/MiddleWare');
const { isAutherizedMiddleWare } = require('../../Authentication/controller/MiddleWares');

const ContactRouter = express.Router();

const allowedRoles = ['ADMIN', 'USER'];

ContactRouter.post('', checkInput,createContactHandler);
ContactRouter.get('', isAutherizedMiddleWare(allowedRoles), getAllContactHandler);
ContactRouter.get('/:id', getContactByIdHandler);
ContactRouter.delete('/:id', deleteContactByIdHandler);


module.exports = ContactRouter;