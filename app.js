/**
 * @file App entry point; root routing
 * @author sepsten
 */

var express = require("express")
    config = require("./server/config");
var app = express();

// Middleware & router imports
var compression = require("compression"),
    apiRouter = require("./server/routes/api");

// Actual routing
app.use(compression());
app.use("/api", apiRouter);

// Server launch
var server = app.listen(config.port, function() {
  console.log("Gasch listening on port " + config.port);
});

// Graceful shutdown
var shutdown = function() {
  console.log("Gasch is stopping...");
  server.close(function() {
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
