const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Favourite extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Favourite.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'favourites', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Favourite;