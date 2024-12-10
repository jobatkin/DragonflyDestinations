const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get('/:uid', verifyToken, (req, res) => {
    Controllers.favouritesController.getFavourites(req, res)
})

router.post('/:uid', verifyToken, (req, res) => {
    Controllers.favouritesController.addFavourite(req, res)
})

router.put('/:fid', verifyToken, (req, res) => {
    Controllers.favouritesController.updateFavourite(req, res)
})

router.delete('/:fid', verifyToken, (req, res) => {
    Controllers.favouritesController.deleteFavourite(req, res)
})

module.exports = router;