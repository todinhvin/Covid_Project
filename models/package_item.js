const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'package_item',
  {
    package_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'package',
        key: 'package_id',
      },
    },
    item_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'item_id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    item_limit: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    db,
    tableName: 'package_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'package_item_pkey',
        unique: true,
        fields: [{ name: 'package_id' }, { name: 'item_id' }],
      },
    ],
  }
);
