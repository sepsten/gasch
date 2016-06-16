/**
 * @file Dumb in-memory document store.
 * @author sepsten
 */

var Store = require("./../util/store"),
    util = require("util");

// cf https://github.com/substance/substance/blob/devel/collab/DocumentStore.js

/**
 * Implements Substance's DocumentStore API.
 *
 * @class
 */
var DocumentModel = function() {
  Store.call(this);

  this.createDocument = function(props, cb) {
    // if no ID, generate one
    if(!props.documentId)
      props.documentId = Math.round(Math.random() * 1e8).toString(16);

    if(this._exists(props.documentId))
      return cb(new Error("Could not create because document already exists."));

    this._save(props.documentId, props);
    this.getDocument(props.documentId, cb);
  };

  this.getDocument = function(id, cb) {
    var doc = this._get(id);
    if(!doc)
      return cb(new Error("Document not found!"));
    cb(null, doc);
  };

  // WARNING: FULL REPLACE
  this.updateDocument = function(id, newProps, cb) {
    if(!this._exists(id))
      return cb(new Error("Document not found!"));
    this._save(id, newProps);
    this.getDocument(id, cb);
  };

  this.deleteDocument = function(id, cb) {
    var doc = this._get(id);
    if(!doc)
      return cb(new Error("Document not found!"));
    this._delete(id);
    cb(null, doc);
  };

  this.documentExists = function(id, cb) {
    cb(null, this._exists(id));
  };

  // Doesn't exist in the DocumentStore API
  this.listDocuments = function(cb) {
    cb(null, this._keys());
  };
};

util.inherits(DocumentModel, Store);

module.exports = new DocumentModel;
