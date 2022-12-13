const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const cabDetails = db.sequelize.define('cabDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model: {
        type: DataTypes.STRING(20),
        allowNull: false
    },  
    price: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    numberPlate : {
        type: DataTypes.STRING(10),
        allowNull:false
    }
});

module.exports = cabDetails;