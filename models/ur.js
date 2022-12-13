const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const urSignUp = db.sequelize.define('ur', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    fname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    lname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    gender: {
        type: DataTypes.STRING(1),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },

    street: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },

    dob: {
        type: DataTypes.STRING(10),
        allowNull:false
    },

    password: {
        type: DataTypes.TEXT
    },

    verificationCode: {
        type: DataTypes.STRING(4)
    }

});

module.exports = urSignUp;