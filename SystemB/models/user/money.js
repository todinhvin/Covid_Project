const db = require("../db");
const { getAccountBalance } = require("./account");

const tableName = "public.account";

exports.putMoneyAccount = async (username, balance_value) => {
  try {
    const { rows } = await db.query(
      "UPDATE account set account_balance = $1 where username=$2 returning *",
      [balance_value, username]
    );
    return rows[0];
  } catch (err) {
    return;
  }
};

exports.putOutMoneyAccount =  async (username, money) => {
  try {
    console.log(money)
    const curBalance =await  getAccountBalance(username)
    console.log(curBalance)
    if(curBalance<money) {
        return
      }
    
     const { rows } = await db.query(
      "UPDATE account set account_balance = $1 where username=$2 returning *",
      [curBalance-money, username]
    );
    return rows[0];
  } catch (err) {
    console.log(err)
    return;
  }
};


