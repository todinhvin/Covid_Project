const db = require('./config/database');
const Address = require('./models/address');

Address.findAll()
  .then((accs) => console.log(accs))
  .catch((err) => console.log(err));
