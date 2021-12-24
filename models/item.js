const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'item',
  {
    item_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    image: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    price: {
      type: Sequelize.REAL,
      allowNull: true,
    },
    unit: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    manager_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'account_id',
      },
    },
  },
  {
    db,
    tableName: 'item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'item_pkey',
        unique: true,
        fields: [{ name: 'item_id' }],
      },
    ],
  }
);
