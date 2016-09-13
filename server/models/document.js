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
 * @file Document store
 * @author sepsten
 */

var co = require("co"),
    Datastore = require("nedb"),
    errors = require("./../errors"),
    shortid = require("shortid"),
    path = require("path"),
    mutil = require("./util"),
    config = require("./../config");

/**
 * Document store.
 * IDs are stored in the `id` field.
 *
 * @class
 * @todo Filesystem-like storage with paths in place of random IDs.
 */
var DocumentModel = function() {
  var db = new Datastore({
    filename: path.join(__dirname, "../../", config.dbPath, "documents.nedb"),
    autoload: true
  });

  /**
   * Creates a document.
   * Returns the created document (with its generated ID) in case of success.
   */
  this.create = function(doc) {
    if(!doc.id)
      doc.id = shortid.generate();

    return new Promise(function(resolve, reject) {
      db.insert(mutil.id2_id(doc), function(err, newDoc) {
        if(err)
          if(err.errorType === "uniqueViolated")
            reject(new errors.DocumentAlreadyExists);
          else
            reject(new errors.ServerError({ originalErr: err }));
        else
          resolve(mutil._id2id(newDoc));
      });
    });
  };

  /**
   * Retrieves a document.
   */
  this.get = function(id) {
    return new Promise(function(resolve, reject) {
      db.findOne({_id: id}, function(err, doc) {
        if(err)
          reject(new errors.ServerError({ originalErr: err }));
        else if(doc === null)
          reject(new errors.DocumentNotFound);
        else
          resolve(mutil._id2id(doc));
      });
    });
  };

  /**
   * Replaces a document's content.
   * Doesn't return anything in case of success.
   */
  this.update = function(doc) {
    return new Promise(function(resolve, reject) {
      db.update({_id: doc.id}, mutil.id2_id(doc), function(err, nbReplaced) {
        if(err)
          reject(new errors.ServerError({ originalErr: err }));
        else if(nbReplaced === 0)
          reject(new errors.DocumentNotFound);
        else
          resolve();
      });
    });
  };

  /**
   * Deletes a document.
   * Doesn't return anything.
   */
  this.delete = function(id) {
    return new Promise(function(resolve, reject) {
      db.remove({_id: id}, function(err, nbRemoved) {
        if(err)
          reject(new errors.ServerError({ originalErr: err }));
        else if(nbRemoved === 0)
          reject(new errors.DocumentNotFound);
        else
          resolve();
      });
    });
  };

  /**
   * Returns a list of all documents' metadata.
   */
  this.list = function() {
    return new Promise(function(resolve, reject) {
      db.find({}, { _id: true }, function(err, docs) {
        if(err)
          reject(new errors.ServerError({ originalErr: err }));
        else
          resolve(docs.map(mutil._id2id));
      });
    });
  };
};

module.exports = new DocumentModel;
