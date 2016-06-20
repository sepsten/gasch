// serve / and /index(.html ?)
// serve static/... (css, img, js)

// serve /[documentid]/ ==> reader
// serve /[documentid]/edit ==> writer
// NB. documentid can contain "/": it is a normalization of document path
// (everything lowercase, remove spaces (and accents?))

var express = require("express"),
    router = express.Router();

router.get("/", function(req, res) {
  res.send("homepage");
});

// Should always be placed before the `/*` route; it would never be matched
// otherwise.
router.get("/*/edit", function(req, res) {
  console.log(req.params);
  res.send("editing " + req.params[0]);
});

router.get("/*", function(req, res) {
  console.log(req.params);
  res.send(req.params[0]);
});

module.exports = router;
