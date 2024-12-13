const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get('/', verifyToken, (req, res) => {
    Controllers.errorController.getErrors(req, res)
})

router.post('/', (req, res) => {
    Controllers.errorController.addError(req, res)
})

module.exports = router;