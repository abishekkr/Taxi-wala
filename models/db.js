const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize("cab","root","0000",{
 
    host: 'localhost',
    dialect:'mysql'

});

module.exports.sequelize = sequelize;