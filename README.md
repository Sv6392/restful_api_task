# Bidding Platform API

This is a real-time bidding platform API built with Node.js, Express, Socket.io, and PostgreSQL. 

## Features

- User registration and authentication
- Create and view items for bidding
- Place bids on items
- Real-time notifications for new bids
- View notifications

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/bidding-platform.git
    ```
2. Install dependencies
    ```bash
    cd bidding-platform
    npm install
    ```
3. Set up environment variables
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your database credentials and other configuration.

4. Run the application
    ```bash
    npm start
    ```

## Running Tests

To run tests, use the following command:
```bash
npm test
