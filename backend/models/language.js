const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Language extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Language.init({
        code: {
            type: DataTypes.STRING, allowNull: false, primaryKey: true
        },
        language: {
            type: DataTypes.STRING, allowNull: false, required: true, 
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'languages', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Language;