/**
 * @file Loads config according to NODE_ENV
 * @author sepsten
 */

var conf;

switch(process.env.NODE_ENV) {
  case "PROD":
    conf = require("./../config.prod.json");
    break;
  default:
    conf = require("./../config.dev.json");
}

module.exports = conf;
