/**
 * Renames the `_id` property of a given object to `id`.
 *
 * @private
 */
exports._id2id = function(obj) {
    obj.id = obj._id;
    delete obj._id;
    return obj;
}

/**
 * Renames the `id` property of a given object to `_id`.
 *
 * @private
 */
exports.id2_id = function(obj) {
  obj._id = obj.id;
  delete obj.id;
  return obj;
};