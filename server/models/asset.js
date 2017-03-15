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
 * @file Asset store
 * @author sepsten
 */

var co = require("co"),
    Datastore = require("nedb"),
    errors = require("./../errors"),
    shortid = require("shortid"),
    uuid = require("uuid/v4"),
    path = require("path"),
    config = require("./../config"),
    fs = require("mz/fs"),
    ofs = require("fs");

/**
 * Asset store. Takes a file, saves it and gives it an ID.
 *
 * @class
 */
var AssetModel = function() {
  // Synchronously resolve the uploads directory's path at startup
  var uploadsDir = ofs.realpathSync(path.join(__dirname, "./../../",
    config.uploadsDir));

  var self = this;

  /**
   * Returns the filepath of an asset with the given ID.
   *
   * @param {String} id - The asset ID
   * @returns {String} The file path (not a promise!)
   */
  this.getPath = function(id) {
    return path.join(uploadsDir, id);
  };

  /**
   * Saves a file to the upload directory.
   *
   * @param {Object} file - A Formidable file instance
   * @returns {Promise} Resolves to the asset's ID
   */
  this.save = function(file) {
    return co(function*() {
      // Assign a UUID to the file which will be used as a filename
      var newName = uuid() + path.extname(file.name);
      // Introduce the new name in the final path
      var newPath = self.getPath(newName);

      // Check if the asset ID is free
      /*if(yield self.exists(file.name))
        throw new errors.AssetAlreadyExists;*/

      // Move the file
      yield fs.rename(file.path, newPath);

      // Return the asset's ID (which is its supplied filename)
      return newName;
    });
  };

  /**
   * The returned promise will resolve to true if the asset with the given ID
   * exists.
   *
   * @param {String} id - The asset ID
   * @returns {Promise} True if the asset exists, false otherwise.
   */
  this.exists = function(id) {
    return fs.exists(this.getPath(id));
  };

  /**
   * Deletes an asset.
   *
   * @param {String} id - The asset ID
   * @returns {Promise} No return value.
   */
  this.delete = function(id) {
    return co(function*() {
      // Check file presence
      if(!(yield self.exists(id)))
        throw new errors.AssetNotFound;

      // Delete the file
      yield fs.unlink(self.getPath(id));
      return;
    });
  };
};

module.exports = new AssetModel;
