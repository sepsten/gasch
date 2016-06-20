/**
 * @file Main API router
 * @author sepsten
 */

var express = require("express"),
    bodyParser = require("body-parser"),
    router = express.Router(),
    documentsEndpoint = require("./documents"),
    tokenEndpoint = require("./token"),
    auth = require("./../../authmw"),
    errors = require("./../../errors");

router.use(bodyParser.json());
router.use("/token", tokenEndpoint);
router.use("/documents", auth(), documentsEndpoint);

router.get("/test", function(req, res, next) {
  throw new Error("im crazyaaayYYY");
});

// Default middleware
router.use(function(req, res, next) {
  next(new errors.NotImplemented);
});

// API error handler
router.use(function(err, req, res, next) {
  if(!(err instanceof errors.APIError))
    return next(err);

  res.status(err.httpCode).json(err.toJSON());
});

module.exports = router;
