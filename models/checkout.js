const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'checkout',
  {
    checkout_id: {
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
    package_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'package',
        key: 'package_id',
      },
    },
    item_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'item_id',
      },
    },
    checkout_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    state: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    payment_history_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'payment_history',
        key: 'payment_history_id',
      },
    },
  },
  {
    db,
    tableName: 'checkout',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'checkout_pkey',
        unique: true,
        fields: [{ name: 'checkout_id' }],
      },
    ],
  }
);
