require('dotenv').config();
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const { fetchRates } = require('./api/fetch-rates');
const { storeRates } = require('./api/store-data');
const { getTodaysRates } = require('./api/get-today-rate');
const { getCurrencyCodes } = require('./api/get-currency-codes');
const { insertCurrencyCodes } = require('./api/insert-currency-codes');
const { getCloseValue } = require('./api/get-close');

const app = express();
app.use(cors());

app.get('/fetch-rates', async (req, res) => {
  try {
    const rates = await fetchRates(process.env.API_ACCESS_KEY);
    if (rates) {
      const message = await storeRates(rates);
      res.status(200).json({ message });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching rates.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching or storing rates.' });
  }
});

app.get('/get-todays-rates', getTodaysRates);

app.get('/get-currency-codes', getCurrencyCodes);

app.get('/insert-currency-codes', insertCurrencyCodes);

app.get('/closeValue', getCloseValue);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
