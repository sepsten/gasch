/**
 * @file Routes for /api/documents
 * @author sepsten
 */

var Document = require("./../../models/document"),
    router = require("lucca")("api:docs"),
    errors = require("./../../errors");

router.get("/", function*() {
  this.response.body = yield Document.list();
});

router.get("/*", function*() {
  this.response.body = yield Document.get(this.request.params[0]);
});

router.post("/*", function*() {
  this.request.body.id = this.request.params[0];
  this.response.status = 201;
  this.response.body = yield Document.create(this.request.body);
});

router.put("/*", function*() {
  this.response.body = yield Document.update(
    this.request.params[0],
    this.request.body
  );
});

router.delete("/*", function*() {
  yield Document.delete(this.request.params[0]);
  this.response.status = 204;
});

module.exports = router;
