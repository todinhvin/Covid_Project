const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'treatment_history',
    {
      treatment_history_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      treatment_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'treatment',
          key: 'treatment_id',
        },
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
      tableName: 'treatment_history',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'treatment_history_pkey',
          unique: true,
          fields: [{ name: 'treatment_history_id' }],
        },
      ],
    }
  );
};
