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
