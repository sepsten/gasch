/**
 * @file Authentication Connect middleware
 * @author sepsten
 */

var Token = require("./models/token");

/**
 * Authentication middleware in the Connect format.
 * Performs basic verifications. One path can be excluded.
 */
var AuthMW = function() {
  return function(req, res, next) {
    // Parse bearer token
    var bearer = req.get("Authorization");

      // Check if present
    if(!bearer)
      return res.status(401).json({error: "Bearer token needed"});

      // Check if valid
    bearer = bearer.split(" ");
    if(bearer[0] !== "Bearer" || bearer.length !== 2)
      return res.status(401).json({error: "Invalid authorization header"});

    // Check token validity
    Token.verifyToken(bearer[1], function(err, decoded) {
      if(err)
        return res.status(401).json(err);

      // Valid token!
      req.token = decoded;
      next();
    });
  };
};

module.exports = AuthMW;
