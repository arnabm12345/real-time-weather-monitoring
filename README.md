

# Real-Time Weather Monitoring System

This project is a real-time weather monitoring system that fetches weather data for multiple cities and displays it in a React frontend. The backend, built using Node.js and Express, fetches weather data from the OpenWeatherMap API and stores it in MongoDB.

## Table of Contents

- [Features](#features)
- [Architecture and Design Choices](#architecture-and-design-choices)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Known Issues](#known-issues)
- [Contributing](#contributing)

## Features

- Fetches real-time weather data from the OpenWeatherMap API.
- Stores data in MongoDB for daily summaries.
- Frontend displays weather data and triggers alerts for extreme temperatures.

## Architecture and Design Choices

1. **Frontend**: Built with React, the frontend uses a simple but responsive design with Flexbox and CSS.
2. **Backend**: Node.js and Express handle the API calls and interact with MongoDB to store and retrieve weather data.
3. **Database**: MongoDB is used to store daily weather summaries.
4. **Weather Data**: The weather data is fetched at regular intervals (5 minutes) and updates the MongoDB database.

## Technologies Used

- **Frontend**: React, Axios for API calls
- **Backend**: Node.js, Express
- **Database**: MongoDB (Local or Cloud)
- **Other**: OpenWeatherMap API for real-time weather data

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or above)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/atlas).
- [OpenWeatherMap API Key](https://openweathermap.org/appid)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/real-time-weather-monitoring.git
cd real-time-weather-monitoring
```

### 2. Install Dependencies

#### Backend

Navigate to the root folder where `server.js` is located:

```bash
npm install
```

#### Frontend (React)

Navigate to the `src` folder where `App.js` is located:

```bash
cd src
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory for the backend (where `server.js` is located):

```
MONGODB_URI=your_mongodb_uri
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
PORT=3000
```

## Running the Application

### Backend (Express)

Start the backend by navigating to the root folder and running:

```bash
npm start
```

This will start the backend at `http://localhost:3000`.

### Frontend (React)

Navigate to the `src` folder and start the React development server:

```bash
npm start
```

This will start the React frontend at `http://localhost:3001`.

You should now be able to view the app in your browser.

## Endpoints

- `GET /api/weather-summaries`: Fetches weather summaries for all cities.

## Known Issues

- Ensure your MongoDB service is running before starting the backend.
- Double-check your OpenWeatherMap API key if data isn't fetching correctly.

## Contributing

Feel free to contribute by opening an issue or submitting a pull request.

-
