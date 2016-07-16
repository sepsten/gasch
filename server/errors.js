/**
 * @file Error definitions
 * @author sepsten
 */

var n = require("nizbel")();

/*** Authentication errors 100-109 ***/
n.def(100, "Forbidden", {
  message: "Token access too limited.",
  httpCode: 403
});

n.def(101, "InvalidAuthHeader", {
  message: "Invalid Authentication HTTP header.",
  httpCode: 401
});

n.def(102, "WrongLoginCredentials", {
  message: "Wrong login credentials: can't authenticate user.",
  httpCode: 401
});

n.def(103, "BadJWTSignature", {
  message: "Bad token signature: can't authenticate user.",
  httpCode: 401
});

n.def(104, "ExpiredToken", {
  message: "Expired token: can't authenticate user.",
  httpCode: 401
});

n.def(105, "LoginCredentialsRequired", {
  message: "Login credentials must be passed.",
  httpCode: 401
});

/*** Document errors 110-119 ***/
n.def(110, "DocumentNotFound", {
  message: "Document not found.",
  httpCode: 404
});

n.def(111, "DocumentAlreadyExists", {
  message: "Document ID already in use.",
  httpCode: 409
});

/*** Other errors 190-199 ***/
n.def(190, "ServerError", {
  message: "The request was aborted because of an internal error.",
  httpCode: 500
});

n.def(191, "NotImplemented", {
  message: "This method isn't implemented yet.",
  httpCode: 501
});

module.exports = n;
