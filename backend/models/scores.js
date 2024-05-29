const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Scores extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Scores.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        question_type: {
            type: DataTypes.STRING, allowNull: false,
        },
        result: {
            type: DataTypes.INTEGER, allowNull: false, defaultValue: 0
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'scores', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Scores;