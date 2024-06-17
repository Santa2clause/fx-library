const { Pool } = require('pg');
const pool = require('../db');

async function insertCurrencyCodes(req, res) {
  try {
    const result = await pool.query(`
      SELECT DISTINCT unnest(string_to_array(symbol, '/')) AS currency_code
      FROM forex_data
      WHERE symbol ~ '^[A-Z]{3}/[A-Z]{3}$'
      ORDER BY currency_code;
    `);

    for (const row of result.rows) {
      const currencyCode = row.currency_code;
      const existingCode = await pool.query(
        'SELECT * FROM forex_codes WHERE currency_code = $1',
        [currencyCode]
      );

      if (existingCode.rows.length === 0) {
        await pool.query('INSERT INTO forex_codes (currency_code) VALUES ($1)', [
          currencyCode
        ]);
      }
    }

    res.status(200).json(result.rows.map(row => row.currency_code));
  } catch (error) {
    console.error('Error fetching currency codes:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching currency codes.' });
  }
}

module.exports = { insertCurrencyCodes };
