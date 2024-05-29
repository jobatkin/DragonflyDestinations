const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { uploadFile } = require("../middleware/uploads");

router.post('/login', (req, res) => {
    Controllers.userController.loginUser(req, res)
})

// upload profile photo before running controller function
router.post('/register', uploadFile, (req, res) => {
    Controllers.userController.registerUser(req, res)
})

router.put('/:id', (req, res) => {
    Controllers.userController.updateUser(req, res)
})

router.get('/:uid/scores', (req, res) => {
    Controllers.userController.getUserScores(req, res)
})

router.post('/:uid/answer', (req, res) => {
    Controllers.userController.saveUserAnswer(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.userController.deleteUser(req, res)
})

module.exports = router;