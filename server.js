require('dotenv').config();
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const cron = require('node-cron');

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

cron.schedule('0 12 * * *', async () => {
  try {
    console.log('Running daily fetch rates job at 12:00 PM SAST');
    const rates = await fetchRates(process.env.API_ACCESS_KEY);
    if (rates) {
      await storeRates(rates);
      console.log('Rates fetched and stored successfully');
    } else {
      console.error('Failed to fetch rates');
    }
  } catch (error) {
    console.error('Error during scheduled fetch rates job:', error.message);
  }
}, {
  timezone: "Africa/Johannesburg"
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
