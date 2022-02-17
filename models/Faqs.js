'use strict';
const { Model, Sequelize } = require('sequelize');
// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
   class Faqs extends Model {
      static associate(models) {
         // define association here
      };
   };
   Faqs.init({
      id: {
         type: DataTypes.INTEGER,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         unique: true,
         allowNull: true
      },
      question: {
         type: DataTypes.STRING,
         allowNull: false
      },

      slug: {
         type: DataTypes.STRING,
         allowNull: false
      },
      answer: {
         type: DataTypes.STRING,
         allowNull: false
      },
      status: {
         type: DataTypes.STRING,
      },



   }, {

      sequelize,
      deletedAt: 'deleted_At',
      modelName: 'Faqs',
      paranoid: true,
      tableName: 'faqs',
      timestamps: true
   });
   return Faqs;
};