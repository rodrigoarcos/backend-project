const { Router } = require("express");
const accountControllers = require("./account.controllers");

const accounts = Router();

accounts.get('/', accountControllers.getAll);
accounts.post('/', accountControllers.createOne);

accounts.get('/:account_id', accountControllers.getOne);
accounts.put('/:account_id', accountControllers.updateOne);
accounts.delete('/:account_id', accountControllers.removeOne);

module.exports = accounts;