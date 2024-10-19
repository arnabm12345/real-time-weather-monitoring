const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  weather_condition: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

// Daily summary schema
const dailySummarySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);
const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

module.exports = { Weather, DailySummary };
