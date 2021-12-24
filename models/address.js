const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'address',
  {
    address_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tinh: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    huyen: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    xa: {
      type: Sequelize.STRING(100),
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
    tableName: 'address',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'address_pkey',
        unique: true,
        fields: [{ name: 'address_id' }],
      },
    ],
  }
);
