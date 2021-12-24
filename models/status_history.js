const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'status_history',
  {
    status_history_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    person_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id',
      },
    },
    status: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    time: {
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
    tableName: 'status_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'status_history_pkey',
        unique: true,
        fields: [{ name: 'status_history_id' }],
      },
    ],
  }
);
