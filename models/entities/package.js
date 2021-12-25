const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'package',
    {
      package_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
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
};
