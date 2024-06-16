const pool = require('../db');

async function storeRates(rates) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('Today: ', today);

    for (const rate of rates) {
      const {
        id: api_id,
        o: open,
        h: high,
        l: low,
        c: close,
        ch: change,
        cp: change_percent,
        t: timestamp,
        s: symbol,
        tm: datetime
      } = rate;

      // Check if data for today and the same currency pair already exists
      const existingData = await pool.query(
        'SELECT COUNT(*) FROM forex_data WHERE DATE(datetime) = $1 AND symbol = $2',
        [today, symbol]
      );

      console.log(`Data Count for ${symbol} on ${today}: `, existingData.rows[0].count);
      if (existingData.rows[0].count === '0') {
        await pool.query(
          `INSERT INTO forex_data (
            api_id, open, high, low, close, change, change_percent, timestamp, symbol, datetime
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
          )`,
          [api_id, open, high, low, close, change, change_percent, timestamp, symbol, datetime]
        );
        console.log(`Rate for ${symbol} stored successfully.`);
      } else {
        console.log(`Rate for ${symbol} on ${today} already exists in the database.`);
      }
    }

    return 'Rates processed successfully.';
  } catch (error) {
    console.error('Error storing rates:', error.message);
    throw new Error('Error storing rates: ' + error.message);
  }
}

module.exports = { storeRates };
