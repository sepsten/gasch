/**
 * @file Token provider
 * @author sepsten
 */

var config = require("./../../config.json"),
    User = require("./user"),
    Store = require("./../util/store"),
    util = require("util"),
    jwt = require("jsonwebtoken"),
    shortid = require("shortid");

/**
 * The token model is the core of the authorization server. It generates, checks
 * and revokes access tokens, which take the form of JSON Web Tokens.
 * For now, the default and only authentication method is by username and
 * password.
 *
 * @class
 */
var TokenModel = function() {
  Store.call(this);

  /**
   * Checks the login details and may return a valid token.
   */
  this.requestToken = function(username, password, cb) {
    var self = this;

    // 1. Check login details
    User.authenticateUser(username, password, function(err, authenticated) {
      if(!authenticated)
        return cb(new Error("Wrong login credentials"));

      // 2. Generate token id
      var jti = shortid.generate();

      // 3. Generate token with config.secret
      var token = jwt.sign({
        iss: "gasch", // Issuer
        iat: Math.floor(Date.now() / 1000), // Issued at (in seconds)
        jti: jti, // JWT ID
        "gasch:user": username
      }, config.secret);

      // 4. Store and send
      self._save(jti, token);
      cb(null, token);
    });
  };

  /**
   * Revokes a valid token. Think «logout».
   */
  this.revokeToken = function(token, cb) {
    var self = this;
    this.verifyToken(token, function(err, decoded) {
      if(err)
        return cb(err);

      self._delete(decoded.jti);
    });
  };

  /**
   * Verifies the authenticity of a token with its signature.
   */
  this.verifyToken = function(token, cb) {
    var self = this;

    // 1. Check for valid signature
    jwt.verify(token, config.secret,
      {algorithms: ["HS256"], issuer: "gasch"},
      function(err, decoded) {
        if(err)
          return cb(new Error("Invalid token"));

        // 2. Check for existence.
        if(!self._exists(decoded.jti))
          cb(new Error("Expired token"));
        else
          cb(null, decoded);
      });
  };
};

util.inherits(TokenModel, Store);

module.exports = new TokenModel;
