const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get('/:uid', verifyToken, (req, res) => {
    Controllers.listController.getLists(req, res)
})

router.post('/:uid', verifyToken, (req, res) => {
    Controllers.listController.addList(req, res)
})

router.put('/:lid', verifyToken, (req, res) => {
    Controllers.listController.updateList(req, res)
})

router.delete('/:lid', verifyToken, (req, res) => {
    Controllers.listController.deleteList(req, res)
})

module.exports = router;