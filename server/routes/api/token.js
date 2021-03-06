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
 * @file Routes for /api/token
 * @author sepsten
 */

var Token = require("./../../models/token"),
    router = require("lucca")("api:token"),
    auth = require("./../../authmw"),
    errors = require("./../../errors"),
    basicAuth = require("basic-auth"),
    logger = require("./../../log").logger;

router.delete("/", auth(), function*() {
  yield Token.revokeToken(this.request.token.jti);
  this.response.status = 204;
});

// Only endpoint not checked for authentication
router.get("/", function*() {
  this.response.set("WWW-Authenticate", "Basic realm=\"Gasch REST API\"");

  let cr = basicAuth(this);
  if(!cr) throw new errors.LoginCredentialsRequired;

  let token = yield Token.requestToken(cr.name, cr.pass);
  this.response.body = {token};
});

module.exports = router;
