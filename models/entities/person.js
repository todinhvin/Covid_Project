const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'person',
    {
      person_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cccd: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      address_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'address',
          key: 'address_id',
        },
      },
      related_person_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'person',
          key: 'person_id',
        },
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
      status: {
        type: DataTypes.STRING(255),
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
      tableName: 'person',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'person_pkey',
          unique: true,
          fields: [{ name: 'person_id' }],
        },
      ],
    }
  );
};
