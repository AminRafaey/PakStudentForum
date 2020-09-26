const express = require("express");
const config = require("config");
const app = express();
const path = require("path");

require("./startup/morgan")(app);
require("./startup/cors")(app);
require("./startup/db")();
app.use(express.static(path.join(__dirname, "/client/build")));
require("./startup/routes")(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

process.on("uncaughtException", function (err, req, res, next) {
  console.log("Node Server startup Error");
});

module.exports = server;
