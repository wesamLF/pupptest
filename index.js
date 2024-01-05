const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
    console.log("redddd")
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteerddd server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});