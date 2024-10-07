'use strict'
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

const User = require('./user') 
const Country = require('./country') 
const Flag = require('./flag') 
const Language = require('./language') 
const Currency = require('./currency') 
const TourismInfo = require('./tourism_info.js')
const Scores = require('./scores.js')
const Favourite = require('./favourite.js')
const List = require('./list.js')
const Submission = require('./submission.js')

async function init() {
    // sync all models - creates tables
    await User.sync(); 
    await Country.sync(); 
    await Flag.sync(); 
    await Language.sync(); 
    await Currency.sync(); 
    await TourismInfo.sync(); 
    await Scores.sync();
    await List.sync();
    await Favourite.sync();
    await Submission.sync();
};
init();

Flag.belongsTo(Country, { foreignKey: { name: 'countryCode', allowNull: false } })
Country.hasOne(Flag);

Country.belongsToMany(Language, { through: 'country_languages' });
Language.belongsToMany(Country, { through: 'country_languages' });

Country.belongsToMany(Currency, { through: 'country_currencies' });
Currency.belongsToMany(Country, { through: 'country_currencies' });

Country.belongsToMany(Country, { as: 'borders', through: 'country_borders' });

TourismInfo.belongsTo(Country, { foreignKey: { name: 'countryCode', allowNull: false } })
Country.hasOne(TourismInfo);

User.hasMany(Scores, { foreignKey: { allowNull: false }});
Scores.belongsTo(User, { foreignKey: { allowNull: false }});

User.hasMany(List, { foreignKey: { allowNull: false }});
List.belongsTo(User, { foreignKey: { allowNull: false }});

List.hasMany(Favourite, { foreignKey: { allowNull: false }});
Favourite.belongsTo(List, { foreignKey: { allowNull: false }});

Country.hasMany(Favourite, { foreignKey: { allowNull: false }});
Favourite.belongsTo(Country, { foreignKey: { allowNull: false } });

User.hasMany(Submission);
Submission.belongsTo(User);

// needed after associations above
sequelizeInstance.sync();

module.exports = {
    User, 
    Country,
    Flag,
    Language,
    Currency,
    TourismInfo,
    Scores,
    Favourite,
    List,
    Submission
};