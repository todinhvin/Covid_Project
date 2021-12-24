const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'treatment_history',
  {
    treatment_history_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    treatment_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'treatment',
        key: 'treatment_id',
      },
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
    tableName: 'treatment_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'treatment_history_pkey',
        unique: true,
        fields: [{ name: 'treatment_history_id' }],
      },
    ],
  }
);
