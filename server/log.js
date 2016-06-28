/**
 * @file Logging logic
 * @author sepsten
 */

var winston = require("winston"),
    config = require("./config");

// Logger instance
var logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      level: config.logLevel
    })
  ]
});

// Request logging middleware
var mw = function() {
  return function(req, res, next) {
    if(req.token)
      logger.debug(req.method, req.originalUrl,
        {user: req.token["gasch:user"]});
    else
      logger.debug(req.method, req.originalUrl, "(unauthenticated)");
  };
};

exports.logger = logger;
exports.mw = mw;
