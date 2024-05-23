const axios = require("axios");
const { JSDOM } = require('jsdom');
const Models = require('../models');
const countryCodes = require("./countryCodes");
const restCountries = require("./restCountries");
const capital_timezones = require("./capital_timezones");

module.exports = async function initialiseCountries() {
    try {
        //const response = await axios.get("https://restcountries.com/v3.1/all");
        //const countries = response.data;
        const countries = restCountries;
        let addedCountries = 0;
        const countryBorders = new Map();

        for (let country of countries) {

            // make sure this is a valid country first
            if (country.population > 0) {
                const capital = (country.capital && Array.isArray(country.capital)) ? country.capital[0] : country.name.common;
                console.log(capital);

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
                    capital: capital,  
                    area: country.area, 
                    region: country.region, 
                    subregion: country.subregion,  
                    borders: country.borders
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

                // keep track of which countries border this one
                countryBorders.set(newCountry, country.borders);
                await insertExtraInfo(newCountry);

                if (createdCountry) {
                    addedCountries++;
                    // insert currencies and languages and timezone details for this country
                    await checkInsertLanguages(newCountry, country.languages);
                    await checkInsertCurrencies(newCountry, country.currencies);  
                    await insertCapitalTimezone(newCountry, country.capitalInfo?.latlng);
                }
            }
        }

        // once all countries are created, add in the bordering relationships
        await insertBorders(countryBorders);               

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

        await country.addLanguage(code);
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

        await country.addCurrency(code);
    }
}

// insert all country border relationships if they exist
async function insertBorders(countryBorders) {
    for (let [borderCountry, borders] of countryBorders) {
        if (borders) {
            for (let borderingCountry of borders) {
                await borderCountry.addBorders(borderingCountry);
            }
        }
    }
}

// Uses the GeoApify API to lookup the timezone for the co-ordinates of this country's capital city
async function insertCapitalTimezone(country, coords) {
    if (coords && coords.length == 2) {
        //const tz_lookup = `${process.env.GEOAPIFY_URL}geocode/reverse?apiKey=${process.env.GEOAPIFY_KEY}&lat=${coords[0]}&lon=${coords[1]}`;
        //const response = await axios.get(tz_lookup);
        //const feature = response.data.features[0];
        const capital = capital_timezones[country.code];

        country.set({
            //capital_tz: feature?.properties.timezone.name
            capital_tz: capital.capital_tz
        });
        
        await country.save();
    }
}

async function insertExtraInfo(country) {

    const gecCode = countryCodes[country.code];
    if (gecCode) {
        console.log(gecCode)
        const response = await axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${gecCode.region}/${gecCode.gec}.json`);

        let newPopulation = response.data["People and Society"].Population?.total?.text;
        if (newPopulation) newPopulation = parseInt(newPopulation.replaceAll(',', ''));
        console.log(`Updating old population of ${country.population} to new population of ${newPopulation} for ${country.name}`)

        let geographyNote = extractFirstParagraph(response.data.Geography["Geography - note"]?.text);
        if (geographyNote && geographyNote.length > 0) {
            geographyNote = geographyNote && geographyNote.length > 0 ? geographyNote.replace(/(<([^>]+)>)/ig, '') : geographyNote;
            geographyNote = geographyNote.replace('note 1: ', '');
        }

        let popDistribution = extractFirstParagraph(response.data["People and Society"]["Population distribution"]?.text);
        if (popDistribution && popDistribution.length > 0) {
            popDistribution = popDistribution.replace(' as shown in this population distribution map', '');
        }       

        country.set({
            background: extractFirstParagraph(response.data.Introduction?.Background?.text),
            geography: extractFirstParagraph(response.data.Geography?.Location?.text),
            geography_note: geographyNote,
            comparative_area: extractFirstParagraph(response.data.Geography["Area - comparative"]?.text),
            climate: extractFirstParagraph(response.data.Geography?.Climate?.text),
            terrain: extractFirstParagraph(response.data.Geography?.Terrain?.text),
            natural_resources: extractFirstParagraph(response.data.Geography["Natural resources"]?.text),
            other_languages: extractFirstParagraph(response.data["People and Society"].Languages?.Languages?.text),
            religions: extractFirstParagraph(response.data["People and Society"].Religions?.text),
            population: newPopulation,
            pop_distribution: popDistribution,
            industries: extractFirstParagraph(response.data.Economy?.Industries?.text),
        });

        await country.save();
    }
}

function extractFirstParagraph(htmlString, maxChars = 4000) {
    // Parse the HTML string
    const { document } = (new JSDOM(htmlString)).window;
  
    // Find the first <p> element
    let firstParagraph = document.querySelector('p');
    firstParagraph = firstParagraph ? firstParagraph.textContent : htmlString;

    if (firstParagraph) {
        const brIndex = firstParagraph.indexOf('<br>');

        // Also check if any fake paragraphs created by <br> tags
        if (brIndex > 0) firstParagraph = firstParagraph.substring(0, firstParagraph.indexOf('<br>'));

        // finally make sure it won't overflow the db column
        firstParagraph = firstParagraph.length > maxChars ? firstParagraph.substring(0, maxChars) : firstParagraph;
    }

    return firstParagraph;
  }
  
  