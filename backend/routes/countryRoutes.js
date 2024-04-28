const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.countryController.getCountries(req, res)
})

router.get('/random', (req, res) => {
    Controllers.countryController.getRandomCountries(req, res)
})

router.get('/:code', (req, res) => {
    Controllers.countryController.getCountry(req, res)
})

module.exports = router;