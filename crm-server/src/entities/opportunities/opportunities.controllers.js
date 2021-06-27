const Opportunity = require("./opportunities.model");

const getAll = async (req, res) => {
  try {
    const docs = await Opportunity.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const getOne = async (req, res) => {
  try {
    console.log(req.params.opportunity_id);
    const docs = await Opportunity.findOne({
      externalId: req.params.opportunity_id,
    })
      .lean()
      .exec();
    if (!docs) {
      return res.status(404).json({
        error: `Opportunity with ExternalId '${req.params.opportunity_id}' not found`,
      });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const createOne = async (req, res) => {
  try {
    const docs = await Opportunity.create(req.body);
    res.status(201).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateOne = async (req, res) => {
  try {
    const docs = await Opportunity.findOneAndUpdate(
      { externalId: req.params.opportunity_id },
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({
          error: `Opportunity with External Id '${req.params.id}' not found`,
        });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const removeOne = async (req, res) => {
  try {
    const docs = await Opportunity.findOneAndRemove({
      externalId: req.params.opportunity_id,
    })
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({
          error: `Opportunity with id '${req.params.opportunity_id}' not found`,
        });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  removeOne,
};
