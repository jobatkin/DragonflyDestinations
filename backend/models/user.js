const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class User extends Model { }

// Sequelize will create this table if it doesn't exist on startup
User.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        userName: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        profilePhoto: {
            type: DataTypes.STRING
        },            
        email: {
            type: DataTypes.STRING, allowNull: false, required: true, unique: true
        },
        resetCode: {
            type: DataTypes.STRING, allowNull: true
        },
        password: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        highScore: {
            type: DataTypes.INTEGER, allowNull: false, defaultValue: 0
        },
        currentScore: {
            type: DataTypes.INTEGER, allowNull: false, defaultValue: 0
        }        
    },
    {
        sequelize: sequelizeInstance, modelName: 'users', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = User;