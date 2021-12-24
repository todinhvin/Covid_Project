const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'person',
  {
    person_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    cccd: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    address_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id',
      },
    },
    related_person_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id',
      },
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
    status: {
      type: Sequelize.STRING(255),
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
    tableName: 'person',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'person_pkey',
        unique: true,
        fields: [{ name: 'person_id' }],
      },
    ],
  }
);
