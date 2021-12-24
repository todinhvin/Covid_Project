const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'treatment',
  {
    treatment_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    capacity: {
      type: Sequelize.INTEGER,
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
    tableName: 'treatment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'treatment_pkey',
        unique: true,
        fields: [{ name: 'treatment_id' }],
      },
    ],
  }
);