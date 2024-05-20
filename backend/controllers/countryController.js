"use strict";
const Models = require("../models");
const { Sequelize } = require('../dbConnect');

// Get all countries from the database. Supports a 'limit' query parameter to get only the top x countries
const getCountries = (req, res) => {
    const options = { include: Models.Flag }; // random order, include flag info
    if (req.query.limit) options.limit = parseInt(req.query.limit);

    Models.Country.findAll(options).then(function (data) {
        res.status(200).json({ result: 'Country data fetched successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

// Get randomly ordered countries from the database. Supports a 'limit' query parameter to get only x random countries
const getRandomCountries = (req, res) => {
    const options = { order: Sequelize.random(), include: Models.Flag }; // random order, include flag info
    if (req.query.limit) options.limit = parseInt(req.query.limit);

    Models.Country.findAll(options).then(function (data) {
        res.status(200).json({ result: 'Random country data fetched successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

// get a single country from the database identified by its code
const getCountry = (req, res) => {
    Models.Country.findOne({ 
        where: { code: req.params.code }, 
        include: [
            { model: Models.Flag, attributes: ['svgLink', 'description'] }, 
            { model: Models.Language, attributes: ['code', 'language'] }, 
            { model: Models.Currency, attributes: ['code', 'name', 'symbol'] }
        ]
    }).then(function (data) {
        res.status(200).json({ result: 'Country data fetched successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

module.exports = {
    getCountries, getRandomCountries, getCountry
}