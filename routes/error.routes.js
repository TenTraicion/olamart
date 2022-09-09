const express = require("express");
const errController = require("../controllers/error.controller");
const router = express.Router();

router.get("/500", errController.serverError);

router.post("/404", errController.notFound);

module.exports = router;
