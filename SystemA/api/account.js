const axios = require("axios");

exports.createAccountSysB = async (username) => {
  try {     
    const data = await axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/api/add-account',
        data: {
          username
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
      });
    return data;
  } catch (err) {
    console.log(err);
  }
};
