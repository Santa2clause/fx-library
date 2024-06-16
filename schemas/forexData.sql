CREATE TABLE IF NOT EXISTS forex_data (
  id SERIAL PRIMARY KEY,
  api_id INT NOT NULL,
  open DECIMAL(19, 10),
  high DECIMAL(19, 10),
  low DECIMAL(19, 10),
  close DECIMAL(19, 10),
  change DECIMAL(19, 10),
  change_percent VARCHAR(10),
  timestamp BIGINT,
  symbol VARCHAR(20),
  datetime TIMESTAMP
);