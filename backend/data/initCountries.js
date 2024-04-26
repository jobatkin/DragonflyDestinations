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

                // insert this country unless it already exists
                const [newFlag, createdFlag] = await Models.Flag.findOrCreate({
                    where: { countryCode: country.cca3 },
                    defaults: insertFlag,
                });       
                
                if (createdCountry) addedCountries++;
            }
        }

        console.log(`Successfully loaded ${addedCountries} new countries from API`);
    } catch (err) {
        console.log(err);
    }
}