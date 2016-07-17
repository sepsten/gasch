/*
Copyright 2016 sepsten

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * @file App entry point; root routing
 * @author sepsten
 */

// Server setup
var koa = require("koa"),
    http = require("http"),
    Router = require("lucca"),
    config = require("./server/config"),
    logger = require("./server/log").logger,
    errors = require("./server/errors");

var app = koa(),
    mainRouter = Router("main");

// Global error handling
app.use(function*(next) {
  try { yield next; }
  catch(e) {
    // At this level, better stop the server.
    if(e instanceof errors.APIError)
      pubErr = e;
    else
      var pubErr = new errors.ServerError;

    this.response.status = pubErr.httpCode;
    this.response.body = pubErr.toPublic();

    logger.error("Critical error! Stopping the instance.", e.data.originalErr || e);
    shutdown();
  }
});

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
