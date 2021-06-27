const { Router } = require("express");
const opportunitiesControllers = require("./opportunities.controllers");

const opportunities = Router();

opportunities.get('/', opportunitiesControllers.getAll);
opportunities.post('/', opportunitiesControllers.createOne);

opportunities.get('/:opportunity_id', opportunitiesControllers.getOne);
opportunities.put('/:opportunity_id', opportunitiesControllers.updateOne);
opportunities.delete('/:opportunity_id', opportunitiesControllers.removeOne);

module.exports = opportunities;