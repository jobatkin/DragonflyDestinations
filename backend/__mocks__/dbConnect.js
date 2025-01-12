// __mocks__/dbConnect.js
const { Sequelize } = require("sequelize");

// Create a mock in-memory SQLite instance
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});

module.exports = { Sequelize: sequelize };
