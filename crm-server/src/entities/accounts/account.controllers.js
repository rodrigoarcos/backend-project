const Account = require("./account.model");

const getAll = async (req, res) => {
  try {
    const docs = await Account.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const getOne = async (req, res) => {
  try {
    const docs = await Account.findOne({ externalId: req.params.account_id })
      .lean()
      .exec();
    if (!docs) {
      return res.status(404).json({
        error: `Account with ExternalId '${req.params.account_id}' not found`,
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
    const docs = await Account.create(req.body);
    res.status(201).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateOne = async (req, res) => {
  try {
    const docs = await Account.findOneAndUpdate(
      { externalId: req.params.account_id },
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
          error: `Account with External Id '${req.params.id}' not found`,
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
    const docs = await Account.findOneAndRemove({
      externalId: req.params.account_id,
    })
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({
          error: `Account with id '${req.params.account_id}' not found`,
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
