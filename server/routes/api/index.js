/**
 * @file Main API router
 * @author sepsten
 */

var bodyParser = require("koa-bodyparser"),
    router = require("lucca")("api"),
    errors = require("./../../errors"),
    documentsEndpoint = require("./documents"),
    tokenEndpoint = require("./token"),
    auth = require("./../../authmw"),
    logger = require("./../../log").logger;

// API error handler
router.use(function*(next) {
  try {
    yield next;
  } catch(err) {
    if(!(err instanceof errors.APIError) || err.code === 190) throw err;

    // Write error to client
    this.response.status = err.httpCode;
    this.response.body = err.toPublic();

    // Log important errors
    if(err.code >= 100 && err.code <= 104) // Check for authentication errors
      // Error 105 is more a Bad Request error than an authentication error
      logger.error("Unauthenticated request: ",
        this.request.method,
        this.request.originalUrl,
        this.request.ip,
        err
      );
  }
});

router.use(bodyParser({enableTypes: ["json"]}));

router.use("/token", tokenEndpoint);
router.use("/documents", auth(), documentsEndpoint);

// Default endpoint
router.use(function*() {
  throw new errors.NotImplemented;
});

module.exports = router;
