/**
 * @file Error definitions
 * @author sepsten
 */

var util = require("util");

/**
 * Base error class.
 *
 * @class
 * @extends Error
 * @param {Number} code - Custom error code
 * @param {String} name - Error name
 * @param {String} desc - Textual description
 * @param {Number} [httpCode] - Equivalent HTTP code
 */
var APIError = function(code, name, desc, httpCode) {
  Error.call(this);
  this.code = code;
  this.name = name;
  this.message = desc;
  this.httpCode = httpCode || 0;
}
util.inherits(APIError, Error);

/**
 * Actually creates an object from the error instance.
 * The HTTP code is excluded from this object.
 *
 * @returns {Object}
 */
APIError.prototype.toJSON = function() {
  return {
    code: this.code,
    name: this.name,
    message: this.message
  };
};

/**
 * Generates error classes.
 *
 * @param {Number} code - Error code
 * @param {String} name - Error name
 * @param {String} desc - Textual description
 * @param {Number} [httpCode] - Equivalent HTTP code
 * @returns {Function} A custom error constructor
 */
function proto(code, name, desc, httpCode) {
  var proto = function(additionalMsg) {
    APIError.call(this, code, name, desc, httpCode);
    if(additionalMsg)
      this.message += " " + additionalMsg;
  };
  util.inherits(proto, APIError);
  exports[name] = proto;
};

exports.APIError = APIError;

/*
 * ERROR DEFINITIONS
 */

// Authentication errors 100-109
proto(100, "Forbidden", "Token access too limited.", 403);
proto(101, "InvalidAuthHeader", "Invalid Authentication HTTP header.", 401);
proto(102, "WrongLoginCredentials", "Wrong login credentials: can't" +
  " authenticate user.", 401);
proto(103, "BadJWTSignature", "Bad token signature: can't authenticate user.",
  401);
proto(104, "ExpiredToken", "Expired token: cant't authenticate user.", 401);

// Document errors 110-119
proto(110, "DocumentNotFound", "Document not found.", 404);
proto(111, "DocumentAlreadyExists", "Document ID already in use.", 409);

// Other errors 190-199
proto(190, "ServerError", "The request was aborted because of an internal "
  + "error.", 500);
proto(191, "NotImplemented", "This method isn't implemented yet.", 501);
