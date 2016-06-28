/**
 * @file Routes for /api/documents
 * @author sepsten
 */

var Document = require("./../../models/document"),
    router = require("lucca")("api:docs"),
    errors = require("./../../errors");

router.get("/", function*() {
  Document.listDocuments(function(err, list) {
    if(err) throw err;
    this.response.body = list;
  });
});

router.get("/*", function*() {
  Document.getDocument(this.params[0], function(err, doc) {
    if(err) throw err;
    res.json(doc);
  });
});

router.post("/*", function*() {
  req.body.documentId = req.params[0];
  Document.createDocument(req.body, function(err, doc) {
    if(err) throw err;
    this.response.body = doc;
  });
});

router.put("/*", function*() {
  Document.updateDocument(req.params[0], req.body, function(err, doc) {
    if(err) throw err;
    this.response.body = doc;
  });
});

router.delete("/*", function*() {
  Document.deleteDocument(this.params[0], function(err, doc) {
    if(err) throw err;
    this.response.body = doc;
  });
});

module.exports = router;
