const axios = require("axios");

exports.responsePaymentA = async ({indept_id,payment_on,indept,cccd}) => {
  try {     
    const data = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/payment/response',
        data: {
            indept_id,payment_on,indept,cccd
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
