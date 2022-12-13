const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const locations = db.sequelize.define('locations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    from: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    to: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    distance: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});

module.exports = locations;