const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'account',
  {
    account_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    role_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'role_id',
      },
    },
    indebt_id: {
      autoIncrement: false,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'indept',
        key: 'indept_id',
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
  },
  {
    db,
    tableName: 'account',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'account_pkey',
        unique: true,
        fields: [{ name: 'account_id' }],
      },
    ],
  }
);
