const express = require("express");
const app = express();

const dotenv = require("dotenv"); 
const environment = process.env.NODE_ENV || "local";
const PORT = process.env.PORT || 8000;

dotenv.config({ path: `./.env.${environment}` }); // support multiple environments, see package.json

require("./dbConnect").connectMysql(); 

// parse requests of content-type - application / json;
app.use(express.json());

let countryRoutes = require('./routes/countryRoutes')
app.use('/api/countries', countryRoutes)

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes)

let favouriteRoutes = require('./routes/favouriteRoutes');
app.use('/api/favourites', favouriteRoutes)

let listRoutes = require('./routes/listRoutes');
app.use('/api/lists', listRoutes)

app.use("/images", express.static("public/images")); // required for image mappings

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
