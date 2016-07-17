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
