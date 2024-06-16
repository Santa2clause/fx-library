const { Pool } = require('pg');
const pool = require('../db');

async function getTodaysRates(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const result = await pool.query(
      `
      SELECT t1.*
      FROM forex_data t1
      LEFT JOIN forex_data t2
      ON t1.symbol = t2.symbol
      AND t1.datetime < t2.datetime
      WHERE t2.symbol IS NULL
      AND t1.datetime <= $1
      `,
      [today]
    );

    console.log('Fetch Todays Rates');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching today\'s rates:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching today\'s rates.' });
  }
}

module.exports = { getTodaysRates };
