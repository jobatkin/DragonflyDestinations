"use strict";
const Models = require("../models");

const getCountries = (req, res) => {
    Models.Country.findAll({}).then(function (data) {
        res.status(200).json({ result: 'Country data fetched successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

const getCountry = (req, res) => {
    Models.Country.find({ where: { code: req.params.id }}).then(function (data) {
        res.status(200).json({ result: 'Country data fetched successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

module.exports = {
    getCountries, getCountry
}