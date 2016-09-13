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
 * @file Routes for /api/assets
 * @author sepsten
 */

var Asset = require("./../../models/asset"),
    router = require("lucca")("api:assets"),
    errors = require("./../../errors"),
    formidable = require("koa-formidable"),
    send = require("koa-send"),
    config = require("./../../config"),
    path = require("path");

router.post("/", 
  formidable({keepExtensions: false, type: "multipart"}), 
  function*() {
    if(!this.request.files.hasOwnProperty("asset"))
      throw new errors.AssetFileRequired;
    var id = yield Asset.save(this.request.files.asset);
    this.response.status = 201;
    this.response.body = {id};
  }
);

router.get("/:id", function*() {
  if(!(yield Asset.exists(this.request.params.id)))
    throw new errors.AssetNotFound;

  var p = yield send(this, this.request.params.id,
    {root: path.join(__dirname, "./../../../", config.uploadsDir)}
  );
});

router.delete("/:id", function*() {
  yield Asset.delete(this.request.params.id);
  this.response.status = 204;
});

module.exports = router;
