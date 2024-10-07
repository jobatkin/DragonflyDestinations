const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/:form', (req, res) => {
    Controllers.submissionsController.getSubmissions(req, res)
})

router.post('/', (req, res) => {
    Controllers.submissionsController.addSubmission(req, res)
})

router.put('/:id', (req, res) => {
    Controllers.submissionsController.updateSubmission(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.submissionsController.deleteSubmission(req, res)
})

module.exports = router;