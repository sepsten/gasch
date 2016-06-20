/**
 * @file Authentication Connect middleware
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
  return function(req, res, next) {
    // TO BE REMOVED?
    if(!config.enableAuth)
      return next();

    // Parse bearer token
    var bearer = req.get("Authorization");

      // Check if present
    if(!bearer)
      return next(new InvalidAuth("Authorization header with bearer token" +
        " required."));

      // Check if valid
    bearer = bearer.split(" ");
    if(bearer[0] !== "Bearer" || bearer.length !== 2)
      return next(new InvalidAuth("Invalid bearer token: syntax error."));

    // Check token validity
    Token.verifyToken(bearer[1], function(err, decoded) {
      if(err)
        return next(err);

      // Valid token!
      req.token = decoded;
      next();
    });
  };
};

module.exports = AuthMW;
