const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'package_item',
    {
      package_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'package',
          key: 'package_id',
        },
      },
      item_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'item',
          key: 'item_id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      item_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'package_item',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'package_item_pkey',
          unique: true,
          fields: [{ name: 'package_id' }, { name: 'item_id' }],
        },
      ],
    }
  );
};
