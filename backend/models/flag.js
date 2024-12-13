const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Flag extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Flag.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        svgLink: {
            type: DataTypes.STRING, allowNull: false, required: true, 
        },            
        pngLink: {
            type: DataTypes.STRING, allowNull: false, required: true, 
        },
        description: {
            type: DataTypes.STRING(1000)
        },
        width: {
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.INTEGER
        }        
    },
    {
        sequelize: sequelizeInstance, modelName: 'flags', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Flag;