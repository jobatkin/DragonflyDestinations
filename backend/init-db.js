const dotenv = require("dotenv"); 
const environment = process.env.NODE_ENV || "local";

dotenv.config({ path: `./.env.${environment}` }); // support multiple environments, see package.json

require("./dbConnect").connectMysql(); 
const initialiseCountries = require('./data/initCountries')

await initialiseCountries();