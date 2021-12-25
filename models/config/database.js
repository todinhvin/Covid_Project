require('dotenv').config();
const Sequelize = require('sequelize');
module.exports = new Sequelize(
  process.env.DB_NAME || 'QuanLyCovid',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || '123456',
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);
