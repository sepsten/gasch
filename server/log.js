/*
Copyright 2016 sepsten

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
