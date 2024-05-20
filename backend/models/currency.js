const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Currency extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Currency.init({
        code: {
            type: DataTypes.STRING, allowNull: false, primaryKey: true
        },
        name: {
            type: DataTypes.STRING, allowNull: false, required: true, 
        },
        symbol: {
            type: DataTypes.STRING, allowNull: true
        }        
    },
    {
        sequelize: sequelizeInstance, modelName: 'currencies', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Currency;