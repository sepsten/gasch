/**
 * @file Dumb user model
 * @author sepsten
 */

var config = require("./../../config.json");

/**
 * Fixed user model. Users and their password are defined in `config.json`.
 *
 * @class
 */
var UserModel = function() {
  /**
   * Checks if the supplied login details are valid and returns the user.
   */
  this.authenticateUser = function(username, password, cb) {
    var user = undefined;
    for(var i = 0; i < config.users.length; i++) {
      if(config.users[i].name === username &&
        config.users[i].password === password) {
        user = config.users[i];
      }
    }

    cb(null, Boolean(user), user);
  };
};

module.exports = new UserModel;
