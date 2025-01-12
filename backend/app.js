const express = require("express");
const app = express();

// parse requests of content-type - application / json;
app.use(express.json());

// set up all route mappings
const countryRoutes = require('./routes/countryRoutes');
app.use('/api/countries', countryRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const favouriteRoutes = require('./routes/favouriteRoutes');
app.use('/api/favourites', favouriteRoutes);

const listRoutes = require('./routes/listRoutes');
app.use('/api/lists', listRoutes);

const submissionRoutes = require('./routes/submissionRoutes');
app.use('/api/submissions', submissionRoutes);

const errorRoutes = require('./routes/errorRoutes');
app.use('/api/errorLog', errorRoutes);

// map uploaded images to the images folder
app.use("/images", express.static("public/images")); 

module.exports = app;