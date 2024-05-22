const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Country extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Country.init({
        code: {
            type: DataTypes.STRING(5), allowNull: false, primaryKey: true
        },
        name: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        officialName: {
            type: DataTypes.STRING
        },            
        latitude: {
            type: DataTypes.FLOAT, 
        },
        longitude: {
            type: DataTypes.FLOAT, 
        },        
        googleMap: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        landlocked: {
            type: DataTypes.BOOLEAN
        },
        population: {
            type: DataTypes.INTEGER, allowNull: false, required: true
        },      
        unMember: {
            type: DataTypes.BOOLEAN, allowNull: false, required: true, default: false
        },
        capital: {
            type: DataTypes.STRING, allowNull: false, required: true
        },  
        area: {
            type: DataTypes.INTEGER, allowNull: false, required: true
        }, 
        region: {
            type: DataTypes.STRING(100), allowNull: false, required: true
        }, 
        subregion: {
            type: DataTypes.STRING(100)
        },
        capital_tz: {
            type: DataTypes.STRING(100)
        },
        geography: { type: DataTypes.STRING(1000) },
        geography_note: { type: DataTypes.STRING(4000) },
        background: { type: DataTypes.STRING(4000) },
        comparative_area: { type: DataTypes.STRING(500) },
        climate: { type: DataTypes.STRING(500) },
        terrain: { type: DataTypes.STRING(500) },
        natural_resources: { type: DataTypes.STRING(500) },
        other_languages: { type: DataTypes.STRING(1000) },
        religions: { type: DataTypes.STRING(1000) },
        pop_distribution: { type: DataTypes.STRING(1000) },
        industries: { type: DataTypes.STRING(1000) },
    },
    {
        sequelize: sequelizeInstance, modelName: 'countries', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Country;