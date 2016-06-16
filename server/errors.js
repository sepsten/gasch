/**
 * @file Error definitions
 * @author sepsten
 */

var util = require("util");

var APIError = function(status, message) {
  Error.call(this);
  this.message = message;
  this.status = status;
};

util.inherits(APIError, Error);

APIError.prototype.toJSON = function() {
  return {message: this.message};
};

exports.APIError = APIError;
