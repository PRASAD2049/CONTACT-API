const express = require('express');
const { createContactHandler, getAllContactHandler, getContactByIdHandler } = require('../controller/ContactController');
const { checkInput } = require('../../Common/controller/MiddleWare');

const ContactRouter = express.Router();

ContactRouter.post('/create', checkInput,createContactHandler);
ContactRouter.get('', getAllContactHandler);
ContactRouter.get(':contactId', getContactByIdHandler);

module.exports = ContactRouter;