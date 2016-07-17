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
 * @file Dumb user model
 * @author sepsten
 */

var config = require("./../config");

/**
 * Fixed user model. Users and their password are defined in `config.json`.
 *
 * @class
 */
var UserModel = function() {
  /**
   * Checks if the supplied login details are valid and returns the user.
   */
  this.authenticateUser = function(username, password) {
    return new Promise((resolve, reject) => {
      var user = undefined;
      for(var i = 0; i < config.users.length; i++) {
        if(config.users[i].name === username &&
          config.users[i].password === password) {
          user = config.users[i];
        }
      }

      resolve(Boolean(user), user);
    });
  };
};

module.exports = new UserModel;
