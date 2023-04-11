const router = require("express").Router();
const controller = require("./movies_theaters.controller");

router
.route("/")
.get(controller.list)

module.exports = router;