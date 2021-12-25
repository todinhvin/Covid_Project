const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'address',
    {
      address_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tinh: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      huyen: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      xa: {
        type: DataTypes.STRING(100),
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
};
