const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'status_history',
    {
      status_history_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      person_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'person',
          key: 'person_id',
        },
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      time: {
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
      tableName: 'status_history',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'status_history_pkey',
          unique: true,
          fields: [{ name: 'status_history_id' }],
        },
      ],
    }
  );
};
