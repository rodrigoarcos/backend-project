const { Router } = require("express");
const contactControllers = require("./contact.controllers");

const contacts = Router();

contacts.get('/', contactControllers.getAll);
contacts.post('/', contactControllers.createOne);

contacts.get('/:contact_id', contactControllers.getOne);
contacts.put('/:contact_id', contactControllers.updateOne);
contacts.delete('/:contact_id', contactControllers.removeOne);

module.exports = contacts;