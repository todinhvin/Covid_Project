const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'treatment',
    {
      treatment_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      manager_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'account',
          key: 'account_id',
        },
      },
    },
    {
      sequelize,
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
};
