const Contact = require("./contact.model");

const getAll = async (req, res) => {
  try {
    const docs = await Contact.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const getOne = async (req, res) => {
  try {
    console.log(req.params.contact_id);
    const docs = await Contact.findOne({ externalId: req.params.contact_id })
      .lean()
      .exec();
    if (!docs) {
      return res.status(404).json({
        error: `Contact with ExternalId '${req.params.contact_id}' not found`,
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
    const docs = await Contact.create(req.body);
    res.status(201).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateOne = async (req, res) => {
  try {
    const docs = await Contact.findOneAndUpdate(
      { externalId: req.params.contact_id },
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
          error: `Contact with External Id '${req.params.id}' not found`,
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
    const docs = await Contact.findOneAndRemove({
      externalId: req.params.contact_id,
    })
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({
          error: `Contact with id '${req.params.contact_id}' not found`,
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
