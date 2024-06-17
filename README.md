# Forex Rate API

This project is a Forex rate API that provides currency conversion rates using data from the [FCS API](https://fcsapi.com/apiv3/). 
The project includes a Node.js backend with an Express.js server and a PostgreSQL database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches and stores Forex rates from the FCS API
- Provides an endpoint to retrieve Forex rates for specific dates
- Includes a front-end component built with Angular for currency conversion
- Supports dynamic updating of currency lists based on user selection
- Utilizes a Bootstrap datepicker for selecting dates

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Santa2clause/fx-library.git
    cd forex-rate-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up the PostgreSQL database:**

    - Create a PostgreSQL database named `postgres`.
    - Run the SQL scripts in the schemas direcotry.
