'use strict';
const { Model, Sequelize } = require('sequelize');
// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      static associate(models) {
         // define association here
      };
   };
   User.init({
      id: {
         type: DataTypes.INTEGER,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         unique: true,
         allowNull: true
      },
      password: {
         type: DataTypes.STRING,
         allowNull: true
      },

      username: {
         type: DataTypes.STRING,
         allowNull: true
      },
      email: {
         type: DataTypes.STRING,
         allowNull: true
      },


   }, {
      sequelize,
      modelName: 'User',
      tableName: 'user',
   });
   return User;
};