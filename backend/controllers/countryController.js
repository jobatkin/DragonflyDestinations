"use strict";
const Models = require("../models");
const { Sequelize } = require('../dbConnect');

const defaultFields = [ 'code', 'name', 'capital', 'region', 'subregion', 'population', 'area' ];
const questionFields = [ 'code', 'name', 'capital', 'region' ];

// helper method to generate the sequelize options for selecting countries with the right attributes and table inclusions/joins
const getCountryOptions = (req) => {
    const flagInclude = { model: Models.Flag, attributes: ['id', 'svgLink', 'width', 'height', 'description'] };
    const options = { include: [flagInclude], attributes: defaultFields }; // default order, default attributes, include flag info

    // limit to the given amount of countries in the limit parameter
    if (req.query.limit) options.limit = parseInt(req.query.limit);

    // optionally include the number of people who have favourited each country
    if (req.query.includeFavourites) {
        options.attributes = [...defaultFields, 
            [Sequelize.literal(`( SELECT COUNT(*) FROM favourites WHERE favourites.countryCode = countries.code )`), 'favouriteCount']
        ];
    }

    return options;
}

// Get all countries from the database. Supports a 'limit' query parameter to get only the top x countries,
// supports an 'includeFavourites' query parameter which if true will include a favouriteCount attribute for each country
const getCountries = (req, res) => {
    const options = getCountryOptions(req);

    Models.Country.findAll(options).then(function (data) {
        res.status(200).json({ result: 'Country data fetched successfully', data: data })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message })
    })
}

// Get randomly ordered countries from the database. Supports a 'limit' query parameter to get only x random countries,
// supports an 'includeFavourites' query parameter which if true will include a favouriteCount attribute for each random country
const getRandomCountries = (req, res) => {
    const options = getCountryOptions(req);
    options.order = Sequelize.random(); // random order

    Models.Country.findAll(options).then(function (data) {
        res.status(200).json({ result: 'Random country data fetched successfully', data: data })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message })
    })
}

// get a single country from the database identified by its code, including all currencies, languages and bordering countries
const getCountry = (req, res) => {
    const favOptions = req.query.includeFavourites ? { 
        attributes: { include: [[Sequelize.literal(`( SELECT COUNT(*) FROM favourites WHERE favourites.countryCode = countries.code )`), 'favouriteCount']] }
    } : {};

    Models.Country.findOne({ 
        where: { code: req.params.code }, 
        include: [
            { model: Models.Flag, attributes: ['id', 'svgLink', 'pngLink', 'description', 'width', 'height'] }, 
            { model: Models.Language, attributes: ['code', 'language'], through: { attributes: [] } }, 
            { model: Models.Currency, attributes: ['code', 'name', 'symbol'], through: { attributes: [] } },
            { model: Models.Country, as: 'borders', attributes: defaultFields,
                include: { model: Models.Flag, attributes: ['svgLink'] }, through: { attributes: [] }
            }
        ],
        ...favOptions
    }).then(function (data) {
        res.status(200).json({ result: 'Country data fetched successfully', data: data })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message })
    })
}

// get tourism info for the given country
const getCountryTourism = (req, res) => {
    Models.TourismInfo.findOne({ 
        where: { countryCode: req.params.code }, 
    }).then(function (data) {
        res.status(200).json({ result: 'Country tourism data fetched successfully', data: data })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message })
    })
}

// generates 4 random countries and randomly chooses one as the 'right' answer - from this can ask about flag, capital, or region
const getQuestion = async (req, res) => {
    const options = {
        raw: true,
        order: Sequelize.random(),
        include: [{model: Models.Flag, attributes: ["svgLink", 'width', 'height']}],
        attributes: questionFields,
        limit: 4,
    }; // random order, include svg flag info

    try {
        const countries = await Models.Country.findAll(options);
        console.log(countries);

        const correct = Math.floor(Math.random() * 4); // randomly choose the right answer from the list
        const answers = countries.map((country, i) => ({
            ...country,
            // filter the object to just the flag keys, then use that array of key-value pairs as object entries
            flag: {...Object.fromEntries(Object.entries(country).filter(([key, value]) => key.startsWith('flag.')).map(([key, value]) => [key.substring(5), value]))},
            correct: i == correct,
        }));
        console.log(answers);


        res.status(200).json({
            result: "Random answers successfully generated",
            goalCountry: countries[correct].name,
            data: answers,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({result: err.message});
    }
}

// get a list of all unique regions
const getRegions = (req, res) => {
    const options = { attributes: [Sequelize.fn('DISTINCT', Sequelize.col('region')), 'region'], raw: true }; 

    Models.Country.findAll(options).then(function (data) {
        const regions = data.map(record => record.region)
        res.status(200).json({ result: 'Unique region data fetched successfully', data: regions })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message })
    })    
}

module.exports = {
    getCountries, getRandomCountries, getCountry, getQuestion, getRegions, getCountryTourism
}