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
 * @file Main API router
 * @author sepsten
 */

var router = require("lucca")("api"),
    errors = require("./../../errors"),
    documentsEndpoint = require("./documents"),
    tokenEndpoint = require("./token"),
    auth = require("./authmw"),
    logger = require("./../../log").logger,
    config = require("./../../config");

router.use("/token", tokenEndpoint);
router.use("/documents", auth(), documentsEndpoint);

// Default endpoint
router.use(function*() {
  throw new errors.NotImplemented;
});

module.exports = router;
