const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.countryController.getCountries(req, res)
})

router.get('/random', (req, res) => {
    Controllers.countryController.getRandomCountries(req, res)
})

router.get('/question', (req, res) => {
    Controllers.countryController.getQuestion(req, res)
})

router.get('/regions', (req, res) => {
    Controllers.countryController.getRegions(req, res)
})

router.get('/:code', (req, res) => {
    Controllers.countryController.getCountry(req, res)
})

router.get('/:code/tourism', (req, res) => {
    Controllers.countryController.getCountryTourism(req, res)
})

module.exports = router;