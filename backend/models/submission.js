const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Submission extends Model { }

// Sequelize will create this table if it doesn't exist on startup
Submission.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        form: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        name: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        email: {
            type: DataTypes.STRING, allowNull: false, required: true
        },            
        message: {
            type: DataTypes.STRING, 
        },      
    },
    {
        sequelize: sequelizeInstance, modelName: 'submissions', // use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Submission;