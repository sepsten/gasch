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
      // Check token presence
      if(!this.request.meta.token)
        throw new InvalidAuth("Can't authenticate: token required!");

      // Check token validity
      let decoded = yield Token.verifyToken(this.request.meta.token);
      this.request.meta.token = decoded; // Valid token!
      yield next;
    }
    else
      yield next;
  };
};

module.exports = AuthMW;
