const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class List extends Model { }

// Sequelize will create this table if it doesn't exist on startup
List.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        name: {
            type: DataTypes.STRING, allowNull: false, default: 'Places to Visit'
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'lists', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = List;