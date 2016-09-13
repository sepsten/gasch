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
 * @file Main API router
 * @author sepsten
 */

var bodyParser = require("koa-bodyparser"),
    router = require("lucca")("api"),
    errors = require("./../../errors"),
    documentsEndpoint = require("./documents"),
    tokenEndpoint = require("./token"),
    assetsEndpoint = require("./assets"),
    auth = require("./../../authmw"),
    logger = require("./../../log").logger,
    config = require("./../../config"),
    cors = require("kcors");

// API error handler
router.use(function*(next) {
  try {
    yield next;
  } catch(err) {
    // Catch JSON ParseErrors
    if(err instanceof SyntaxError) {
      err = new errors.JSONSyntaxError(err.message);
    }

    if(!(err instanceof errors.APIError) || err.code === 190) throw err;

    // Write error to client
    this.response.status = err.httpCode;
    this.response.body = err.toPublic();

    // Log important errors
    if(err.code >= 100 && err.code <= 104) // Check for authentication errors
      // Error 105 is more a Bad Request error than an authentication error
      logger.error("Unauthenticated request: ",
        this.request.method,
        this.request.originalUrl,
        this.request.ip,
        err
      );
  }
});

if(config.enableCORS) {
  logger.warn("CORS requests will be accepted.");
  router.use(cors());
}

router.use("/token", bodyParser({enableTypes: ["json"]}), tokenEndpoint);
router.use("/documents", auth(), bodyParser({enableTypes: ["json"]}), documentsEndpoint);
router.use("/assets", auth(), assetsEndpoint);

// Default endpoint
router.use(function*() {
  throw new errors.NotImplemented;
});

module.exports = router;
