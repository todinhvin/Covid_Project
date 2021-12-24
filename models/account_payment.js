const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'account_payment',
  {
    account_payment_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
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
    balance: {
      type: Sequelize.REAL,
      allowNull: true,
    },
  },
  {
    db,
    tableName: 'account_payment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'account_payment_pkey',
        unique: true,
        fields: [{ name: 'account_payment_id' }],
      },
    ],
  }
);
