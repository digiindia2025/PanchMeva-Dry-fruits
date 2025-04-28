const express = require('express');
const { createContact, getAllContacts, deleteContact } = require('../Controller/contactController');
const ContactRouter = express.Router();

ContactRouter.post('/send-enquery', createContact);
ContactRouter.get('/all-contacts', getAllContacts);
ContactRouter.delete('/delete-contact/:id', deleteContact);

module.exports = ContactRouter;
