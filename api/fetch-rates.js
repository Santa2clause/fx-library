const axios = require('axios');
require('dotenv').config();

async function fetchRates(accessKey) {
  try {
    const response = await axios.get(`https://fcsapi.com/api-v3/forex/latest?symbol=all_forex&access_key=${accessKey}`);
    return response.data.response;
  } catch (error) {
    console.error('Error fetching rates:', error.message);
    return null;
  }
}

module.exports = { fetchRates };