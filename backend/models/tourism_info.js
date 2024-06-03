const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class TourismInfo extends Model { }

// Sequelize will create this table if it doesn't exist on startup
TourismInfo.init({
        reasons: { type: DataTypes.JSON, allowNull: false },
        warnings: { type: DataTypes.JSON, allowNull: false },
        cuisine: { type: DataTypes.JSON, allowNull: false },
        bestMonths: { type: DataTypes.STRING(100), allowNull: false },
        bestMonthsArray: { type: DataTypes.JSON, allowNull: false },
        topThingsToDo: { type: DataTypes.JSON, allowNull: false },
        safety_rating: { type: DataTypes.FLOAT }
    },
    {
        sequelize: sequelizeInstance, modelName: 'tourism_info', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = TourismInfo;