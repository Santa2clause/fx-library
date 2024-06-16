CREATE TABLE forex_codes (
  id SERIAL PRIMARY KEY,
  currency_code VARCHAR(3) UNIQUE NOT NULL
);
