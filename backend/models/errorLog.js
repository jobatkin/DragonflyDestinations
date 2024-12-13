const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class ErrorLog extends Model { }

// Sequelize will create this table if it doesn't exist on startup
ErrorLog.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        type: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        code: {
            type: DataTypes.STRING(10), allowNull: true
        },
        message: {
            type: DataTypes.STRING(512), allowNull: false, required: true
        },      
        responseResult: {
            type: DataTypes.STRING(512), allowNull: true
        },               
        stackTrace: {
            type: DataTypes.STRING(512), allowNull: true
        },      
    },
    {
        sequelize: sequelizeInstance, modelName: 'errors', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = ErrorLog;