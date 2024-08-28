const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/:uid', (req, res) => {
    Controllers.favouritesController.getFavourites(req, res)
})

router.post('/:uid', (req, res) => {
    Controllers.favouritesController.addFavourite(req, res)
})

router.put('/:fid', (req, res) => {
    Controllers.favouritesController.updateFavourite(req, res)
})

router.delete('/:fid', (req, res) => {
    Controllers.favouritesController.deleteFavourite(req, res)
})

module.exports = router;