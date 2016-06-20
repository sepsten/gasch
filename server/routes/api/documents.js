/**
 * @file Routes for /api/documents
 * @author sepsten
 */

var express = require("express"),
    Document = require("./../../models/document")
    router = express.Router(),
    errors = require("./../../errors");

router.get("/", function(req, res, next) {
  Document.listDocuments(function(err, list) {
    if(err)
      return next(err);

    res.json(list);
  });
});

router.get("/*", function(req, res, next) {
  Document.getDocument(req.params[0], function(err, doc) {
    if(err)
      return next(err);

    res.json(doc);
  });
});

router.post("/*", function(req, res, next) {
  req.body.documentId = req.params[0];
  Document.createDocument(req.body, function(err, doc) {
    if(err)
      return next(err);

    res.json(doc);
  });
});

router.put("/*", function(req, res, next) {
  Document.updateDocument(req.params[0], req.body, function(err, doc) {
    if(err)
      return next(err);

    res.json(doc);
  });
});

router.delete("/*", function(req, res, next) {
  Document.deleteDocument(req.params[0], function(err, doc) {
    if(err)
      return next(err);

    res.json(doc);
  });
});

module.exports = router;
