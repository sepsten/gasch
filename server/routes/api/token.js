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
  yield Token.revokeToken(this.token.jti);
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
