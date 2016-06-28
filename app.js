/**
 * @file App entry point; root routing
 * @author sepsten
 */

// Server setup
var koa = require("koa"),
    http = require("http"),
    Router = require("lucca"),
    config = require("./server/config"),
    logger = require("./server/log").logger;

var app = koa(),
    mainRouter = Router("main");

// Routing
mainRouter.use("/api", require("./server/routes/api"));

// Boot
logger.info("Environment: " + config.env);
app.use(mainRouter);
var server = http.createServer(app.callback());

server.listen(config.port, function() {
  logger.info("Listening on port " + config.port);
});

// Graceful shutdown
var shutdown = function() {
  logger.info("Gasch is stopping...");
  server.close(function() {
    process.exit(0);
  });

  setTimeout(function() {
    logger.warn("Time is out: forcing all connections to close.");
    process.exit(0);
  }, 1000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
