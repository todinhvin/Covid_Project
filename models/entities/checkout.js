const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'checkout',
    {
      checkout_id: {
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
      package_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'package',
          key: 'package_id',
        },
      },
      item_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'item',
          key: 'item_id',
        },
      },
      checkout_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      payment_history_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'payment_history',
          key: 'payment_history_id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'checkout',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'checkout_pkey',
          unique: true,
          fields: [{ name: 'checkout_id' }],
        },
      ],
    }
  );
};
