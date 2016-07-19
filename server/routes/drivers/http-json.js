// INDEX.JS
// ========

//bodyParser = require("koa-bodyparser"),
//     cors = require("kcors");


/*
if(config.enableCORS) {
  logger.warn("CORS requests will be accepted.");
  router.use(cors());
}

router.use(bodyParser({enableTypes: ["json"]}));
*/



// TOKEN.JS
// ========

//     basicAuth = require("basic-auth"),

/*
// Only endpoint not checked for authentication
router.get("/", function*() {
  this.response.set("WWW-Authenticate", "Basic realm=\"Gasch REST API\"");

  let cr = basicAuth(this);
  if(!cr) throw new errors.LoginCredentialsRequired;

  let token = yield Token.requestToken(cr.name, cr.pass);
  this.response.body = {token};
});
*/


// AUTHMW.JS
// =========

/*
var AuthMW = function() {
  return function*(next) {
    if(config.enableAuth) {
      // Parse bearer token
      var bearer = this.request.get("Authorization");

      // Check if present
      if(!bearer)
        throw new InvalidAuth("Authorization header with bearer token" +
          " required.");

      // Check if valid
      bearer = bearer.split(" ");
      if(bearer[0] !== "Bearer" || bearer.length !== 2)
        throw new InvalidAuth("Invalid bearer token: syntax error.");

      // Check token validity
      let decoded = yield Token.verifyToken(bearer[1]);
      this.token = decoded; // Valid token!
      yield next;
    }
    else
      yield next;
  };
};
*/
