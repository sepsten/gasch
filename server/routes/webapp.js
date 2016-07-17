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
