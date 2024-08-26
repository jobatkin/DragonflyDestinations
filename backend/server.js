const express = require("express");
const app = express();

const dotenv = require("dotenv"); // first do 'npm install dotenv'
const environment = process.env.NODE_ENV || "local";
dotenv.config({ path: `./.env.${environment}` }); // support multiple environments, see package.json

require("./dbConnect").connectMysql(); // first run 'npm install sequelize mysql2'
const initialiseCountries = require('./data/initCountries')

// parse requests of content-type - application / json;
app.use(express.json());

app.use((error, req, res, next) => {
  console.log('This is the rejected field ->', error.field);
});

let countryRoutes = require('./routes/countryRoutes')
app.use('/api/countries', countryRoutes)

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes)

app.use("/images", express.static("public/images")); // required for image mappings

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  //await initialiseCountries();
});
