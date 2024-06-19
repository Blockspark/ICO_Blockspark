var express = require('express');
var router = express.Router();

//user route
router.use("/admin", require("./admin.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;