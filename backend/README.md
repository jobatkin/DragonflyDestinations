# Dragonfly Destinations - Backend

Welcome to the backend of **Dragonfly Destinations**, a Node.js-based REST API supporting the platform's functionality for exploring global data about countries. This backend serves as the core of the application, handling data management, processing, and secure communication with the frontend.

## Key Features and Functionality

- **API Endpoints**: Provides endpoints for managing country data, user interactions, and other essential services.
- **Data Management**: Uses Sequelize as the ORM for efficient interactions with a MySQL database.
- **Performance Optimizations**: Implements caching strategies and optimized queries for fast response times.
- **Security Measures**: Includes secure input validation, environment variable configurations, and protected endpoints.

## Architecture

The backend is structured around the **MVC (Model-View-Controller)** design pattern to separate concerns and ensure maintainability:

- **Models**: Define the database schema and relationships using Sequelize.
- **Controllers**: Handle the core logic for each API route.
- **Routes**: Define endpoints and their HTTP methods, delegating tasks to controllers.
- **Utilities**: Helper functions for repetitive tasks, such as data validation and error handling.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Lightweight framework for API routing and middleware management.
- **Sequelize**: ORM for managing MySQL database operations and relationships.
- **MySQL**: Relational database for storing and querying data efficiently.
- **dotenv**: Manages environment variables to keep sensitive information secure.
- **bcrypt**: Ensures secure password hashing for user authentication.

## Coding Strategies

1. **Code Modularity**: Functions and utilities are broken into reusable modules.
2. **Asynchronous Operations**: Uses `async/await` for smooth handling of asynchronous tasks.
3. **Validation**: Ensures robust data validation using middleware and utility functions.
4. **Environment Variables**: Configurations are stored in `.env` to secure sensitive data.

## API Endpoints

Here are the key API endpoints provided by the backend:

### Country Data
- `GET /api/countries`: Retrieves a list of all countries
- `GET /api/countries/:code`: Fetches detailed information about a specific country
- `GET /api/countries/random`: Fetches a given number of countries at random
- `GET /api/countries/question`: Generates a country question with 4 possible and 1 correct answer
- `GET /api/countries/regions`: Fetches the total list of regions for all countries
- `GET /api/countries/:code/tourism`: Fetches the tourism data about a given country

### User Interactions
- `POST /api/users/register`: Registers a new user
- `POST /api/users/login`: Logs in an existing user and generates a token
- `PUT /api/users/:id`: Updates user information (authentication required)
- `POST /api/users/forgotpw`: Generates a reset code to email to a valid user to reset their password
- `POST /api/users/resetpw`: If the user email and reset code match, update the password to the new value
- `DELETE /api/users/:id`: Deletes a user account (authentication required)
- `GET /api/users/:id/scores`: Gets the number/result of challenge questions answered by this user
- `GET /api/users/leaderboard`: Gets the number of correctly answered challenge questions from all users
- `POST /api/users/:id/answer`: Saves the result of the given challenge question answered by the given user

## Favourites, Lists and Form Submissions
- `GET /api/favourites/:uid`: Get all favourite countries saved for a given user (authentication required)
- `POST /api/favourites/:uid`: Add a new favourite country for a given user (authentication required)
- `PUT /api/favourites/:fid`: Update data for a given favourite country (authentication required)
- `DELETE /api/favourites/:fid`: Delete a favourite country (authentication required)

- `GET /api/lists/:uid`: Get all country lists saved for a given user (authentication required)
- `POST /api/lists/:uid`: Add a new country list for a given user (authentication required)
- `PUT /api/lists/:lid`: Update data for a given country list (authentication required)
- `DELETE /api/lists/:lid`: Delete a country list (authentication required)

- `GET /api/submissions/:fid`: Get all submissions for a given form id
- `POST /api/submissions/`: Store a new form submission in the database
- `PUT /api/submissions/:id`: Update data for a given form submission (authentication required)
- `DELETE /api/submissions/:id`: Delete a form submission (authentication required)

## Setup and Installation

1. Clone the repository:  
    ```bash
    git clone https://github.com/jobatkin/DragonflyDestinations.git
    cd DragonflyDestinations/backend

2. Install dependencies:  
   ```bash
   npm install

3. Create a `.env` file with the following variables:
    ```bash
    DB_HOST=<your-database-host>
    DB_USER=<your-database-user>
    DB_PASS=<your-database-password>
    DB_NAME=<your-database-name>
    JWT_SECRET=<your-jwt-secret>
    GOOGLE_MAPS_KEY=<your-Google-Maps-API-key>
    GEOAPIFY_KEY=<your-GeoApify-API-key>

4. Initialise the database with initial data (first time only):
    ```bash
    npm init-db

5. Start the backend:
    ```bash
    npm start