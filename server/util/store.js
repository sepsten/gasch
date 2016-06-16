/**
 * @file Utility in-memory store.
 * @author sepsten
 */

/**
 * In-memory store. Wrapper around `Map` which provides handy synchronous
 * methods for REPL manipulation.
 *
 * @class
 */
var Store = function() {
  var map = new Map;

  this._get = function(key) {
    return map.get(key);
  };

  this._save = function(key, value) {
    map.set(key, value);
    return true;
  };

  this._exists = function(key) {
    return map.has(key);
  };

  this._delete = function(key) {
    return map.delete(key);
  };

  this._keys = function() {
    return Array.from(map.keys());
  };
};

module.exports = Store;
