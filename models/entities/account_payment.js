const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'account_payment',
    {
      account_payment_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      account_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'account',
          key: 'account_id',
        },
      },
      balance: {
        type: DataTypes.REAL,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'account_payment',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'account_payment_pkey',
          unique: true,
          fields: [{ name: 'account_payment_id' }],
        },
      ],
    }
  );
};
