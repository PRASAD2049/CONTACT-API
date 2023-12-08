const express = require('express');
const { createContactHandler, getAllContactHandler, getContactByIdHandler } = require('../controller/ContactController');
const { checkInput } = require('../../Common/controller/MiddleWare');
const { isAutherizedMiddleWare } = require('../../Authentication/controller/MiddleWares');

const ContactRouter = express.Router();

const allowedRoles = ['ADMIN', 'USER'];

ContactRouter.post('/create', checkInput,createContactHandler);
ContactRouter.get('', isAutherizedMiddleWare(allowedRoles), getAllContactHandler);
ContactRouter.get(':contactId', getContactByIdHandler);

module.exports = ContactRouter;