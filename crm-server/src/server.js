const express = require("express");
const config = require("./config");

const app = express();

app.get("/", async (req, res) => {
  res.status(200).json({ hello: "world!" });
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
