const { Account, Contact, Opportunity } = require("./entities/crm/crm.model");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Morgan monitorizes the api requests callout time. It shows in the console when you make a request.

const config = require("./config");
const mongodb = require("mongodb");

const db = require("./db");

const URL = "mongodb://admin:fullstack@localhost:27017";
const client = new mongodb.MongoClient(URL);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ hello: "world!" });
});

// List all objectsç

app.get("/accounts", async (req, res) => {
  try {
    const docs = await Account.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get("/opportunities", async (req, res) => {
  try {
    const docs = await Opportunity.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const docs = await Contact.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

// Get object by id

app.get("/accounts/:account_id", async (req, res) => {
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
});

app.get("/contacts/:contact_id", async (req, res) => {
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
});

app.get("/opportunities/:opportunity_id", async (req, res) => {
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
});

// Create single objects

app.post("/accounts", async (req, res) => {
  try {
    const docs = await Account.create(req.body);
    res.status(201).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.post("/contacts", async (req, res) => {
  try {
    const docs = await Contact.create(req.body);
    res.status(201).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.post("/opportunities", async (req, res) => {
  try {
    const docs = await Opportunity.create(req.body);
    res.status(201).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

// update single objects

app.put("/accounts/:account_id", async (req, res) => {
  try {
    const docs = await Account.findOneAndUpdate({ externalId: req.params.account_id }, req.body, {
      new: true,
    })
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({ error: `Account with External Id '${req.params.id}' not found` });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.put("/contacts/:contact_id", async (req, res) => {
  try {
    const docs = await Contact.findOneAndUpdate({ externalId: req.params.contact_id }, req.body, {
      new: true,
    })
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({ error: `Contact with External Id '${req.params.id}' not found` });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.put("/opportunities/:opportunity_id", async (req, res) => {
  try {
    const docs = await Opportunity.findOneAndUpdate({ externalId: req.params.opportunity_id }, req.body, {
      new: true,
    })
      .lean()
      .exec();
    if (!docs) {
      return res
        .status(404)
        .json({ error: `Opportunity with External Id '${req.params.id}' not found` });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

// delete single objects

app.delete("/accounts/:account_id", async (req, res) => {
  try {
    const docs = await Account.findOneAndRemove({ externalId: req.params.account_id }).lean().exec();
    if (!docs) {
      return res
        .status(404)
        .json({ error: `Account with id '${req.params.account_id}' not found` });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.delete("/contacts/:contact_id", async (req, res) => {
  try {
    const docs = await Contact.findOneAndRemove({ externalId: req.params.contact_id }).lean().exec();
    if (!docs) {
      return res
        .status(404)
        .json({ error: `Contact with id '${req.params.contact_id}' not found` });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});


app.delete("/opportunities/:opportunity_id", async (req, res) => {
  try {
    const docs = await Opportunity.findOneAndRemove({ externalId: req.params.opportunity_id }).lean().exec();
    if (!docs) {
      return res
        .status(404)
        .json({ error: `Opportunity with id '${req.params.opportunity_id}' not found` });
    }
    res.status(200).json({ results: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

const startServer = async () => {
  try {
    await db.connect();
    app.listen(config.port, () => {
      console.log(`Forum API listening on ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

startServer();
