'use strict'
const User = require('./user') 
const Country = require('./country') 
const Flag = require('./flag') 

async function init() {
    // sync all models - creates tables
    await User.sync(); 
    await Country.sync(); 
    await Flag.sync(); 
};
init();

Flag.belongsTo(Country, { foreignKey: { name: 'countryCode', allowNull: false } })
Country.hasOne(Flag);

module.exports = {
    User, 
    Country,
    Flag
};