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
        capital_tz_offset: {
            type: DataTypes.STRING(100)
        }                                               
    },
    {
        sequelize: sequelizeInstance, modelName: 'countries', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Country;