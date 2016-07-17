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
 * @file Authentication middleware
 * @author sepsten
 */

var config = require("./config"),
    Token = require("./models/token"),
    InvalidAuth = require("./errors").InvalidAuthHeader;

/**
 * Authentication middleware in the Connect format.
 * Performs basic verifications.
 */
var AuthMW = function() {
  return function*(next) {
    if(config.enableAuth) {
      // Parse bearer token
      var bearer = this.request.get("Authorization");

      // Check if present
      if(!bearer)
        throw new InvalidAuth("Authorization header with bearer token" +
          " required.");

      // Check if valid
      bearer = bearer.split(" ");
      if(bearer[0] !== "Bearer" || bearer.length !== 2)
        throw new InvalidAuth("Invalid bearer token: syntax error.");

      // Check token validity
      let decoded = yield Token.verifyToken(bearer[1]);
      this.token = decoded; // Valid token!
      yield next;
    }
    else
      yield next;
  };
};

module.exports = AuthMW;
