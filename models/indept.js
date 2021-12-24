const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'indept',
  {
    indept_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    indept: {
      type: Sequelize.REAL,
      allowNull: true,
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    minimum_pay: {
      type: Sequelize.REAL,
      allowNull: true,
    },
    account_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    db,
    tableName: 'indept',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'indept_pkey',
        unique: true,
        fields: [{ name: 'indept_id' }],
      },
    ],
  }
);
