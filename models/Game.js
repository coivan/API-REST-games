const sequelize = require('sequelize');
const connection = require('../db/connection');

const Game = connection.define('games', {
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    year:{
        type: sequelize.INTEGER,
        allowNull: true
    },
    price:{
        type: sequelize.DECIMAL(19, 8),
        allowNull: true
    }
});

// Game.sync({ force: true }); //force create or recreate if alreds exists the table; STAY COMMENTED

module.exports = Game;