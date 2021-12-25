var DataTypes = require('sequelize').DataTypes;
var _account = require('./entities/account');
var _account_payment = require('./entities/account_payment');
var _address = require('./entities/address');
var _checkout = require('./entities/checkout');
var _indept = require('./entities/indept');
var _item = require('./entities/item');
var _package = require('./entities/package');
var _package_item = require('./entities/package_item');
var _payment_history = require('./entities/payment_history');
var _person = require('./entities/person');
var _role = require('./entities/role');
var _status_history = require('./entities/status_history');
var _treatment = require('./entities/treatment');
var _treatment_history = require('./entities/treatment_history');

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var account_payment = _account_payment(sequelize, DataTypes);
  var address = _address(sequelize, DataTypes);
  var checkout = _checkout(sequelize, DataTypes);
  var indept = _indept(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var package = _package(sequelize, DataTypes);
  var package_item = _package_item(sequelize, DataTypes);
  var payment_history = _payment_history(sequelize, DataTypes);
  var person = _person(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var status_history = _status_history(sequelize, DataTypes);
  var treatment = _treatment(sequelize, DataTypes);
  var treatment_history = _treatment_history(sequelize, DataTypes);

  item.belongsToMany(package, {
    as: 'package_id_packages',
    through: package_item,
    foreignKey: 'item_id',
    otherKey: 'package_id',
  });
  package.belongsToMany(item, {
    as: 'item_id_items',
    through: package_item,
    foreignKey: 'package_id',
    otherKey: 'item_id',
  });
  account_payment.belongsTo(account, {
    as: 'account',
    foreignKey: 'account_id',
  });
  account.hasMany(account_payment, {
    as: 'account_payments',
    foreignKey: 'account_id',
  });
  address.belongsTo(account, { as: 'manager', foreignKey: 'manager_id' });
  account.hasMany(address, { as: 'addresses', foreignKey: 'manager_id' });
  checkout.belongsTo(account, { as: 'account', foreignKey: 'account_id' });
  account.hasMany(checkout, { as: 'checkouts', foreignKey: 'account_id' });
  item.belongsTo(account, { as: 'manager', foreignKey: 'manager_id' });
  account.hasMany(item, { as: 'items', foreignKey: 'manager_id' });
  package.belongsTo(account, { as: 'manager', foreignKey: 'manager_id' });
  account.hasMany(package, { as: 'packages', foreignKey: 'manager_id' });
  payment_history.belongsTo(account, {
    as: 'account',
    foreignKey: 'account_id',
  });
  account.hasMany(payment_history, {
    as: 'payment_histories',
    foreignKey: 'account_id',
  });
  person.belongsTo(account, { as: 'manager', foreignKey: 'manager_id' });
  account.hasMany(person, { as: 'manager_people', foreignKey: 'manager_id' });
  status_history.belongsTo(account, {
    as: 'manager',
    foreignKey: 'manager_id',
  });
  account.hasMany(status_history, {
    as: 'status_histories',
    foreignKey: 'manager_id',
  });
  treatment.belongsTo(account, { as: 'manager', foreignKey: 'manager_id' });
  account.hasMany(treatment, { as: 'treatments', foreignKey: 'manager_id' });
  treatment_history.belongsTo(account, {
    as: 'manager',
    foreignKey: 'manager_id',
  });
  account.hasMany(treatment_history, {
    as: 'treatment_histories',
    foreignKey: 'manager_id',
  });
  person.belongsTo(address, { as: 'address', foreignKey: 'address_id' });
  address.hasMany(person, { as: 'people', foreignKey: 'address_id' });
  checkout.belongsTo(item, { as: 'item', foreignKey: 'item_id' });
  item.hasMany(checkout, { as: 'checkouts', foreignKey: 'item_id' });
  package_item.belongsTo(item, { as: 'item', foreignKey: 'item_id' });
  item.hasMany(package_item, { as: 'package_items', foreignKey: 'item_id' });
  checkout.belongsTo(package, { as: 'package', foreignKey: 'package_id' });
  package.hasMany(checkout, { as: 'checkouts', foreignKey: 'package_id' });
  package_item.belongsTo(package, { as: 'package', foreignKey: 'package_id' });
  package.hasMany(package_item, {
    as: 'package_items',
    foreignKey: 'package_id',
  });
  checkout.belongsTo(payment_history, {
    as: 'payment_history',
    foreignKey: 'payment_history_id',
  });
  payment_history.hasMany(checkout, {
    as: 'checkouts',
    foreignKey: 'payment_history_id',
  });
  account.belongsTo(person, { as: 'person', foreignKey: 'person_id' });
  person.hasMany(account, { as: 'accounts', foreignKey: 'person_id' });
  person.belongsTo(person, {
    as: 'related_person',
    foreignKey: 'related_person_id',
  });
  person.hasMany(person, { as: 'people', foreignKey: 'related_person_id' });
  status_history.belongsTo(person, { as: 'person', foreignKey: 'person_id' });
  person.hasMany(status_history, {
    as: 'status_histories',
    foreignKey: 'person_id',
  });
  treatment_history.belongsTo(person, {
    as: 'person',
    foreignKey: 'person_id',
  });
  person.hasMany(treatment_history, {
    as: 'treatment_histories',
    foreignKey: 'person_id',
  });
  account.belongsTo(role, { as: 'role', foreignKey: 'role_id' });
  role.hasMany(account, { as: 'accounts', foreignKey: 'role_id' });
  person.belongsTo(treatment, { as: 'treatment', foreignKey: 'treatment_id' });
  treatment.hasMany(person, { as: 'people', foreignKey: 'treatment_id' });
  treatment_history.belongsTo(treatment, {
    as: 'treatment',
    foreignKey: 'treatment_id',
  });
  treatment.hasMany(treatment_history, {
    as: 'treatment_histories',
    foreignKey: 'treatment_id',
  });

  return {
    account,
    account_payment,
    address,
    checkout,
    indept,
    item,
    package,
    package_item,
    payment_history,
    person,
    role,
    status_history,
    treatment,
    treatment_history,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
