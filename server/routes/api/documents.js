/**
 * @file Routes for /api/documents
 * @author sepsten
 */

var express = require("express"),
    Document = require("./../../models/document")
    router = express.Router();

router.get("/", function(req, res) {
  Document.listDocuments(function(err, list) {
    if(err)
      return res.status(500).json(err);

    res.json(list);
  });
});

module.exports = router;
