const axios = require("axios");
const Models = require('../models')

module.exports = async function initialiseCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data;
        let addedCountries = 0;

        for (let country of countries) {

            // make sure this is a valid country first
            if (Array.isArray(country.capital) && country.population > 0) {
                const insertCountry = {
                    code: country.cca3,
                    name: country.name.common,
                    officialName: country.name.official,            
                    latitude: country.latlng[0],
                    longitude: country.latlng[1],        
                    googleMap: country.maps.googleMaps,
                    landlocked: country.landlocked,
                    population: country.population,      
                    unMember: country.unMember,
                    capital: country.capital[0],  
                    area: country.area, 
                    region: country.region, 
                    subregion: country.subregion,  
                }
                const insertFlag = {
                    countryCode: country.cca3,
                    svgLink: country.flags.svg,            
                    pngLink: country.flags.png,
                    description: country.flags.alt
                }

                // insert this country unless it already exists
                const [newCountry, createdCountry] = await Models.Country.findOrCreate({
                    where: { code: country.cca3 },
                    defaults: insertCountry,
                });

                // insert this flag unless it already exists
                const [newFlag, createdFlag] = await Models.Flag.findOrCreate({
                    where: { countryCode: country.cca3 },
                    defaults: insertFlag,
                });   

                if (createdCountry) {
                    addedCountries++;
                    // insert currencies and languages and timezone details for this country
                    await checkInsertLanguages(newCountry, country.languages);
                    await checkInsertCurrencies(newCountry, country.currencies);                    
                    await insertCapitalTimezone(newCountry, country.capitalInfo?.latlng);
                }
            }
        }

        console.log(`Successfully loaded ${addedCountries} new countries from API`);
    } catch (err) {
        console.log(err);
    }
}

// inserts the languages for this country across our many-to-many tables
async function checkInsertLanguages(country, languages) {

    for (let code in languages) {
        const newLanguage = {
            code: code,
            language: languages[code]
        }

        const language = await Models.Language.findOrCreate({
            where: { code: code },
            defaults: newLanguage,            
        })

        country.addLanguage(code);
    }
}

// inserts the currencies for this country across our many-to-many tables
async function checkInsertCurrencies(country, currencies) {

    for (let code in currencies) {
        const newCurrency = {
            code: code,
            name: currencies[code].name,
            symbol: currencies[code].symbol,
        }

        const currency = await Models.Currency.findOrCreate({
            where: { code: code },
            defaults: newCurrency,            
        })

        country.addCurrency(code);
    }
}

// Uses the GeoApify API to lookup the timezone for the co-ordinates of this country's capital city
async function insertCapitalTimezone(country, coords) {
    if (coords && coords.length == 2) {
        const tz_lookup = `${process.env.GEOAPIFY_URL}reverse?apiKey=${process.env.GEOAPIFY_KEY}&lat=${coords[0]}&lon=${coords[1]}`;
        const response = await axios.get(tz_lookup);
        const feature = response.data.features[0];

        country.set({
            capital_tz: feature?.properties.timezone.name
        });
        await country.save();
    }
}