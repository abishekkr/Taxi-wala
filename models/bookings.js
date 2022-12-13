const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const bookings = db.sequelize.define('bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pickup: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    dropoff: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date:{
        type: DataTypes.STRING(10),
        allowNull:false
    },
    time:{
        type: DataTypes.STRING(10),
        allowNull:false
    },
    carModel:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        
    },
    distance:{
        type: DataTypes.INTEGER,
        
    },
    allotedDriver:{
        type:DataTypes.STRING(3)
    },
    customerId:{
        type:DataTypes.STRING(3)
    }
});

module.exports = bookings;