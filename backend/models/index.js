'use strict'
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

const User = require('./user') 
const Country = require('./country') 
const Flag = require('./flag') 
const Language = require('./language') 
const Currency = require('./currency') 

async function init() {
    // sync all models - creates tables
    await User.sync(); 
    await Country.sync(); 
    await Flag.sync(); 
    await Language.sync(); 
    await Currency.sync(); 
};
init();

Flag.belongsTo(Country, { foreignKey: { name: 'countryCode', allowNull: false } })
Country.hasOne(Flag);

Country.belongsToMany(Language, { through: 'country_languages' });
Language.belongsToMany(Country, { through: 'country_languages' });

Country.belongsToMany(Currency, { through: 'country_currencies' });
Currency.belongsToMany(Country, { through: 'country_currencies' });

// needed after belongs to many associations above
sequelizeInstance.sync();

module.exports = {
    User, 
    Country,
    Flag,
    Language,
    Currency
};