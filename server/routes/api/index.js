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
    APIError = require("./../../errors").APIError;

router.use(bodyParser.json());
router.use("/token", tokenEndpoint);
router.use("/documents", auth(), documentsEndpoint);

router.get("/teapot", function(req, res, next) {
  next(new APIError(418, "Am I really a teapot?"));
});

router.use(function(err, req, res, next) {
  if(err instanceof APIError)
    res.status(err.status).json(err.toJSON());
  else
    res.sendStatus(500); // unknown error
});

module.exports = router;
