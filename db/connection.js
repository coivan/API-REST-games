const Sequelize = require('sequelize');

const connection = new Sequelize('api_rest_games', 'postgres', '1234567', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    timezone: '-3:00'
});

module.exports = connection; 
