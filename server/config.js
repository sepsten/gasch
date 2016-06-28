/**
 * @file Loads config according to NODE_ENV
 * @author sepsten
 */

var conf;

switch(process.env.NODE_ENV) {
  case "PROD":
    conf = require("./../config.prod.json");
    conf.env = "PROD";
    break;
  default:
    conf = require("./../config.dev.json");
    conf.env = "DEV";
}

module.exports = conf;
