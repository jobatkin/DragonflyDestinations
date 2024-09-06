const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/:uid', (req, res) => {
    Controllers.listController.getLists(req, res)
})

router.post('/:uid', (req, res) => {
    Controllers.listController.addList(req, res)
})

router.put('/:lid', (req, res) => {
    Controllers.listController.updateList(req, res)
})

router.delete('/:lid', (req, res) => {
    Controllers.listController.deleteList(req, res)
})

module.exports = router;