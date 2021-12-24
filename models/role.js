const Sequelize = require('sequelize');
const db = require('../config/database');
module.exports = db.define(
  'role',
  {
    role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    db,
    tableName: 'role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'role_pkey',
        unique: true,
        fields: [{ name: 'role_id' }],
      },
    ],
  }
);
