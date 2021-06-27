const express = require("express");
const config = require("./config");
const mongodb = require("mongodb");
const { json } = require("express");

const URL = "mongodb://admin:fullstack@localhost:27017";
const client = new mongodb.MongoClient(URL);

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ hello: "world!" });
});

// List all objects

app.get("/accounts", async (req, res) => {
  await client.connect();
  const db = client.db("crmsite");
  const result = await db.collection("accounts").find({}).toArray();
  res.status(200).json({ results: result });

  client.close();
})

app.get("/opportunities", async (req, res) => {
  await client.connect();
  const db = client.db("crmsite");
  const result = await db.collection("opportunities").find({}).toArray();
  res.status(200).json({ results: result });

  client.close();
})

app.get("/contacts", async (req, res) => {
  await client.connect();
  const db = client.db("crmsite");
  const result = await db.collection("contacts").find({}).toArray();
  res.status(200).json({ results: result });

  client.close();
})

// Get object by id

app.get("/accounts/:account_id", async (req, res) => {
  await client.connect();

  const { account_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: account_id };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("accounts").findOne(filter);
  res.status(200).json({ results: result });

  client.close();
});

app.get("/contacts/:contact_id", async (req, res) => {
  await client.connect();

  const { contact_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: contact_id };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("contacts").findOne(filter);
  res.status(200).json({ results: result });

  client.close();
});

app.get("/opportunities/:opportunity_id", async (req, res) => {
  await client.connect();

  const { opportunity_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: opportunity_id };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("opportunities").findOne(filter);
  res.status(200).json({ results: result });

  client.close();
});

// Create single objects

app.post("/accounts", async (req, res) => {
  await client.connect();
  const db = client.db("crmsite");
  const result = await db.collection("accounts").insertOne(req.body);
  res.status(200).json({ results: result });

  client.close();
});

app.post("/opportunities", async (req, res) => {
  await client.connect();
  const db = client.db("crmsite");
  const result = await db.collection("opportunities").insertOne(req.body);
  res.status(200).json({ results: result });

  client.close();
});

app.post("/contacts", async (req, res) => {
  await client.connect();
  const db = client.db("crmsite");
  const result = await db.collection("contacts").insertOne(req.body);
  res.status(200).json({ results: result });

  client.close();
});

// update single objects

app.put("/accounts/:account_id", async (req, res) => {
  await client.connect();

  const { account_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: account_id };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("accounts").updateOne(filter, updateDoc, options);
  res.status(200).json({ results: result });

  client.close();
});

app.put("/contacts/:contact_id", async (req, res) => {
  await client.connect();

  const { contact_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: contact_id };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("contacts").updateOne(filter, updateDoc, options);
  res.status(200).json({ results: result });

  client.close();
});

app.put("/opportunities/:opportunity_id", async (req, res) => {
  await client.connect();

  const { opportunity_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: opportunity_id };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("opportunities").updateOne(filter, updateDoc, options);
  res.status(200).json({ results: result });

  client.close();
});

// delete single objects

app.delete("/accounts/:account_id", async (req, res) => {
  await client.connect();

  const { account_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: account_id };
  const result = await db.collection("accounts").deleteOne(filter);
  res.status(200).json({ results: result });

  client.close();
});

app.delete("/contacts/:contact_id", async (req, res) => {
  await client.connect();

  const { contact_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: contact_id };
  const result = await db.collection("contacts").deleteOne(filter);
  res.status(200).json({ results: result });

  client.close();
});

app.delete("/opportunities/:opportunty_id", async (req, res) => {
  await client.connect();

  const { opportunty_id } = req.params;
  const db = client.db("crmsite");
  const filter = { id: opportunty_id };
  const result = await db.collection("opportunities").deleteOne(filter);
  res.status(200).json({ results: result });

  client.close();
});

const startServer = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`Forum API listening on ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

startServer();
