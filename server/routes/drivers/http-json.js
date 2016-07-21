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

var config = require("./../../config"),
    bodyParser = require("koa-bodyparser"),
    cors = require("kcors"),
    compose = require("koa-compose"),
    basicAuth = require("basic-auth"),
    logger = require("./../../log").logger,
    errors = require("./../../errors");

/**
 * Returns a HTTP-JSON driver middleware for Lucca.
 *
 * @param {LuccaRouter} router - The root router of the API
 * @param {Boolean} opt.cors - True if CORS requests should be allowed
 */
module.exports = function(router, opt={}) {
  var mw = [];

  // API error handler
  mw.push(function*(next) {
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
          this.request.path,
          err
        );
    }
  });

  // Init middleware
  mw.push(function*(next) {
    this.request.meta = {};
    yield next;
  });

  // Body parser middleware
  mw.push(bodyParser({enableTypes: ["json"]}));

  // CORS middleware
  if(opt.cors) mw.push(cors()); // Should we warn?

  // Basic auth parsing middleware
  // WARNING: It replaces the body!
  mw.push(function*(next) {
    if(this.request.get("Authorization")) {
      let cr = basicAuth(this);
      if(!cr) throw new errors.LoginCredentialsRequired;
      this.request.body = {name: cr.name, pass: cr.pass};
    }

    yield next;
  });

  // Auth token parsing middleware
  mw.push(function*(next) {
    if(config.enableAuth) {
      // Parse bearer token
      var bearer = this.request.get("Authorization");

      // Check if present
      if(bearer) {
        // Check if valid
        bearer = bearer.split(" ");
        if(bearer[0] !== "Bearer" || bearer.length !== 2)
          throw new errors.InvalidAuth("Invalid bearer token: syntax error.");

        this.request.meta.token = bearer[1];
      }
    }

    yield next;
  });

  // Main driver middleware
  /*mw.push(function*(next) {
    // Prepare a context for the API call
    var request = {
      method: this.request.method,
      path: this.request.path,
      body: this.lucca.body, // body and meta should be set by previous
      meta: this.lucca.meta, // middlewares
      tracking: {
        ip: this.request.ip
      }
    };
    var response = {status: 200, body: null};
    var context = {request, response};

    yield co.wrap(router.mw).call(context); // Call the API

    // Export the Lucca response object
    this.response.status = response.status;
    this.response.body = response.body;
    delete this.lucca; // Remove temporary objects

    yield next;
  });*/

  // This alternate main driver middleware just use the normal Koa context
  // as the abstracted API should only use a subset of it.
  mw.push(function*(next) {
    yield router.mw;
    delete this.request.meta; // Delete because it is specific to Lucca
    yield next;
  });

  return compose(mw);
};

// TOKEN.JS
// ========

// Nota bene: This should be eventually added in a special hook defined with
// the actual endpoint that would be called by the driver.

/*
// Only endpoint not checked for authentication
router.get("/", function*() {
  this.response.set("WWW-Authenticate", "Basic realm=\"Gasch REST API\"");
});
*/
