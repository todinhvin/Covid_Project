const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'item',
    {
      item_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      price: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING(50),
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
      tableName: 'item',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'item_pkey',
          unique: true,
          fields: [{ name: 'item_id' }],
        },
      ],
    }
  );
};
