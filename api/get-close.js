const { Pool } = require('pg');
const pool = require('../db');

async function getCloseValue(req, res) {
  try {
    const currencyPair = req.query.pair;
    const currencyDate = req.query.date;
    const query = 'SELECT close FROM forex_data WHERE symbol = $1 AND DATE(datetime) = $2 ORDER BY datetime DESC LIMIT 1';
    const { rows } = await pool.query(query, [currencyPair, currencyDate]);
    if (rows.length > 0) {
      const closeValue = rows[0].close;
      res.status(200).json({ closeValue });
    } else {
      res.status(404).json({ message: 'Close value not found for the given currency pair and date' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getCloseValue };
