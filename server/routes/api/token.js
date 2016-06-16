/**
 * @file Routes for /api/token
 * @author sepsten
 */

var express = require("express"),
    Token = require("./../../models/token")
    router = express.Router(),
    auth = require("./../../authmw"),
    APIError = require("./../../errors").APIError;

// Only endpoint not checked for authentication
router.post("/", function(req, res) {
  if(!req.body.username || !req.body.password)
    return next(new APIError(400, "Username and password required. " +
      "Please check the documentation."));

  Token.requestToken(req.body.username, req.body.password, function(err, tok) {
    if(err)
      return next(new APIError(401, "wrong credentials"));

    res.json({token: tok});
  });
});

router.delete("/", auth(), function(req, res) {
  Token.revokeToken(req.token.jti, function(err) {
    res.sendStatus(204);
  });
});

module.exports = router;
