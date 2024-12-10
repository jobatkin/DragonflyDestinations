const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get('/:form', (req, res) => {
    Controllers.submissionsController.getSubmissions(req, res)
})

router.post('/', (req, res) => {
    Controllers.submissionsController.addSubmission(req, res)
})

router.put('/:id', verifyToken, (req, res) => {
    Controllers.submissionsController.updateSubmission(req, res)
})

router.delete('/:id', verifyToken, (req, res) => {
    Controllers.submissionsController.deleteSubmission(req, res)
})

module.exports = router;