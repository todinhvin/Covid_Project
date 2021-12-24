const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'payment_history',
  {
    payment_history_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    account_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'account_id',
      },
    },
    payment_on: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    total_money: {
      type: Sequelize.REAL,
      allowNull: true,
    },
  },
  {
    db,
    tableName: 'payment_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'payment_history_pkey',
        unique: true,
        fields: [{ name: 'payment_history_id' }],
      },
    ],
  }
);
