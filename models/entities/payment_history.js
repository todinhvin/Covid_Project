const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'payment_history',
    {
      payment_history_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
      payment_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      total_money: {
        type: DataTypes.REAL,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'payment_history',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'payment_history_pkey',
          unique: true,
          fields: [{ name: 'payment_history_id' }],
        },
      ],
    }
  );
};
