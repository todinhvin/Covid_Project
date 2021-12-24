const Sequelize = require('sequelize');
module.exports = new Sequelize('QuanLyCovid', 'postgres', '021299', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
