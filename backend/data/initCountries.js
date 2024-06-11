const axios = require("axios");
const fs = require("fs");
const { JSDOM } = require('jsdom');
const Models = require('../models');
const countryCodes = require("./countryCodes");
const restCountries = require("./restCountries");
const capital_timezones = require("./capital_timezones");
const nongecCountries = require("./nongecCountries");
const flagDescriptions = require("./flagDescriptions");
const { fetchCountryPhotos } = require("./lookupCountryImages");

module.exports = async function initialiseCountries() {
    try {
        //const response = await axios.get("https://restcountries.com/v3.1/all");
        //const countries = response.data;
        const countries = restCountries;
        const travelSafetyRatings = await getTravelSafetyRatings();
        let addedCountries = 0;
        const countryBorders = new Map();
        const tourism = JSON.parse(fs.readFileSync(__dirname + '/tourism.json', 'utf8'));

        for (let country of countries) {

            // make sure this is a valid country first
            if (country.population > 0) {
                // if this country has no capital, just use the country name as it's likely very small
                const capital = (country.capital && Array.isArray(country.capital)) ? country.capital[0] : country.name.common;

                const insertCountry = {
                    code: country.cca3,
                    iso_code: country.cca2,
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
                    subregion: country.subregion
                }
                const insertFlag = {
                    svgLink: country.flags.svg,            
                    pngLink: country.flags.png,
                    description: country.flags.alt || flagDescriptions[country.cca3]
                }

                // insert this country unless it already exists, in which case update it
                const [newCountry, createdCountry] = await Models.Country.upsert({
                    ...insertCountry,
                    code: country.cca3
                }, { returning: true });

                // Find or create the flag
                const [flagInstance, createdFlag] = await Models.Flag.findOrCreate({
                    where: { countryCode: country.cca3 },
                    defaults: insertFlag
                });

                // If the flag already existed, update its details
                if (!createdFlag) {
                    await flagInstance.update(insertFlag);
                }

                // insert the tourism info for this country
                await checkInsertTourismInfo(newCountry, travelSafetyRatings[country.cca2], tourism);

                // keep track of which countries border this one
                countryBorders.set(newCountry, country.borders);
                await insertExtraInfo(newCountry);

                if (createdCountry) {
                    addedCountries++;
                    // insert currencies and languages and timezone details for this new country
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

// get the latest safety ratings for all available countries
async function getTravelSafetyRatings() {
    let data = {};
    let localData;
    let needsAPIRefresh = true;

    try {
        // Read the local file
        localData = JSON.parse(fs.readFileSync(__dirname + '/travel-safety-ratings.json', 'utf8'));

        // Get the modification time of the file
        const stats = fs.statSync(__dirname + '/travel-safety-ratings.json');
        const mtime = new Date(stats.mtime);
        const currentTime = new Date();       
        
        // If the file modification time is more than 2 days old, fetch the latest data
        needsAPIRefresh = (currentTime - mtime) / (1000 * 60 * 60 * 24) > 2 || !localData;
    } catch (err) {
        // Handle file read error (file might not exist)
        console.error('Error reading local travel safety data file:', err.message);
        localData = {};
        needsAPIRefresh = true;
    }

    if (needsAPIRefresh) {
        try {
            // Fetch data from API
            const response = await axios.get('https://www.travel-advisory.info/api');
            data = response.data.data;

            // Store data in local file
            fs.writeFileSync(__dirname + '/travel-safety-ratings.json', JSON.stringify(data, null, 2));
            console.log('Travel safety data updated successfully.');
        } catch (error) {
            // Handle API fetch error
            console.error('Error fetching data from API:', error);
            data = localData;
        }
    } else {
        // Use local data if it's less than 2 days old
        data = localData;
        console.log('Using cached travel safety data.');
    }

    return data;
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

async function checkInsertTourismInfo(country, safetyRating, tourism) {
    const tourismInfo = tourism[country.code];
    if (tourismInfo) {
        tourismInfo.safety_rating = safetyRating?.advisory?.score;
        tourismInfo.bestMonthsArray = parseMonthRange(tourismInfo.bestMonths);
        
        if (!tourismInfo.googlePhotos) {
            const countryPhotos = await fetchCountryPhotos(country.name);
            tourismInfo.googlePhotos = countryPhotos;

            tourism[country.code] = tourismInfo;
            fs.writeFileSync(__dirname + '/tourism.json', JSON.stringify(tourism, null, 2));
        }

        // Find or create the tourism info
        const [tourismInstance, createdTourism] = await Models.TourismInfo.findOrCreate({
            where: { countryCode: country.code },
            defaults: tourismInfo
        });

        // If the tourism info already existed, update its details
        if (!createdTourism) {
            await tourismInstance.update(tourismInfo);
        }
    }
}

async function insertExtraInfo(country) {

    const gecCode = countryCodes[country.code];
    if (gecCode) {
        const response = await axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${gecCode.region}/${gecCode.gec}.json`);

        let newPopText = response.data["People and Society"].Population?.total?.text;
        let newPopulation = newPopText ? parseInt(newPopText.replaceAll(',', '')) : undefined;
        if (!Number.isInteger(newPopulation)) newPopulation = country.population;
        console.log(`Updating old population of ${country.population} to new population of ${newPopulation} for ${country.name}`)

        let geographyNote = extractFirstParagraph(response.data.Geography["Geography - note"]?.text);
        if (geographyNote && geographyNote.length > 0) {
            geographyNote = geographyNote.replace(/(<([^>]+)>)/ig, ''); // strip html tags
            geographyNote = geographyNote.replace('note 1: ', ''); // remove any 'note 1' phrases
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
    } else {
        const details = nongecCountries[country.code];

        country.set(details);
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
  
  // take a month range like "November to February" or "March to May, September to November" and return an array of all included months
  function parseMonthRange(monthRange) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const ranges = monthRange.split(", ");
    let includedMonths = [];

    ranges.forEach(range => {
        const [startMonth, endMonth] = range.split(" to ");
        const startIndex = months.indexOf(startMonth);
        const endIndex = months.indexOf(endMonth);

        if (startIndex === -1 || endIndex === -1) {
            return [];
        }

        if (startIndex <= endIndex) {
            includedMonths = includedMonths.concat(months.slice(startIndex, endIndex + 1));
        } else {
            includedMonths = includedMonths.concat(months.slice(startIndex));
            includedMonths = includedMonths.concat(months.slice(0, endIndex + 1));
        }
    });

    return includedMonths;
}