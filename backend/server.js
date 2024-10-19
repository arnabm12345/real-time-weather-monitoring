// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

//const cors=require('cors')
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error:', err));

// Define a schema for weather data
const weatherSchema = new mongoose.Schema({
  city: String,
  date: Date,
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantWeather: String,
});

// Create a model
const WeatherSummary = mongoose.model('WeatherSummary', weatherSchema);

// Function to fetch weather data
const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    console.log('Fetched weather data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Process weather data and save to DB
const processWeatherData = async (data) => {
  const { main, weather, dt } = data;
  const dominantWeather = weather[0].main; // Main weather condition
  const summary = await WeatherSummary.findOne({ date: new Date(dt * 1000).setHours(0, 0, 0, 0), city: data.name });
  
  if (summary) {
    // Update existing summary
    summary.avgTemp = (summary.avgTemp + main.temp) / 2; // Calculate average
    summary.maxTemp = Math.max(summary.maxTemp, main.temp);
    summary.minTemp = Math.min(summary.minTemp, main.temp);
    summary.dominantWeather = dominantWeather; // Update dominant weather
    await summary.save();
  } else {
    // Create new summary
    const newSummary = new WeatherSummary({
      city: data.name,
      date: new Date(dt * 1000).setHours(0, 0, 0, 0),
      avgTemp: main.temp,
      maxTemp: main.temp,
      minTemp: main.temp,
      dominantWeather,
    });
    await newSummary.save();
  }
};

// Function to get weather for multiple cities
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const getWeatherUpdates = async () => {
  for (const city of cities) {
    const data = await fetchWeatherData(city);
    if (data) {
        console.log(data);
      await processWeatherData(data);
    }
  }
};

// Add this code in server.js
app.get('/api/weather-summaries', async (req, res) => {
    try {
      const summaries = await WeatherSummary.find({});
      res.json(summaries);
    } catch (error) {
      res.status(500).send('Error retrieving weather summaries');
    }
  });
  
// Set an interval to fetch weather data
setInterval(getWeatherUpdates,5*60*1000);
 // Every 5 minutes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
