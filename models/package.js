const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'package',
  {
    package_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    due_date: {
      type: Sequelize.DATE,
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
    tableName: 'package',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'package_pkey',
        unique: true,
        fields: [{ name: 'package_id' }],
      },
    ],
  }
);
