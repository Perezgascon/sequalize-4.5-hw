const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgres://uisfwexz:81TIBEqQqUvPgzqWm_mH93MhYdz01zKo@rosie.db.elephantsql.com/uisfwexz");

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}

module.exports = {
    testConnection,
    sequelize,
};
