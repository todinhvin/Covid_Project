const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'account',
    {
      account_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      role_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'role_id',
        },
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'person',
          key: 'person_id',
        },
      },
      indebt_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
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
};
