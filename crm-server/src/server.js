const express = require("express");
const cors = require("cors");

const config = require("./config");
const db = require("./db");
const accountsRouter = require('./entities/accounts/account.router');
const contactsRouter = require('./entities/contacts/contact.router');
const opportunitiesRouter = require('./entities/opportunities/opportunities.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/accounts", accountsRouter);
app.use("/contacts", contactsRouter);
app.use("/opportunities", opportunitiesRouter);

app.get("/", async (req, res) => {
  res.status(200).json({ hello: "world!" });
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
