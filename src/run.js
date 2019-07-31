const express = require("express");
const app = express();
const path = require("path");
const index = require("../dist/node.index").default;

console.log(path.join(__dirname, "..", "dist"));

app.get("/", function (req, res) {
  res.send(index());
});

app.use("/", express.static(path.join(__dirname, "..", "dist")));

app.listen(8080)