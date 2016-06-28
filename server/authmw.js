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
