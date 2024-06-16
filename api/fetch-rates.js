const axios = require('axios');

async function fetchRates(accessKey) {
  try {
    const response = await axios.get(`${FOREX_LATEST_V3}?symbol=all_forex&access_key=${accessKey}`);
    return response.data.response;
  } catch (error) {
    console.error('Error fetching rates:', error.message);
    return null;
  }
}

module.exports = { fetchRates };