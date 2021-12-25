const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indept', {
    indept_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    indept: {
      type: DataTypes.REAL,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    minimum_pay: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'indept',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "indept_pkey",
        unique: true,
        fields: [
          { name: "indept_id" },
        ]
      },
    ]
  });
};
