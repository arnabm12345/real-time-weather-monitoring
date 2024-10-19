// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [cities, setCities] = useState([]);
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/weather-summaries');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const checkAlerts = () => {
    weatherData.forEach(summary => {
      if (summary.maxTemp > 35) {
         setAlertMessage(`Alert: High temperature in ${summary.city}!`);
      }
    },
  );
  };
  

  useEffect(() => {
    checkAlerts();
  }, [weatherData]);

  return (
    <div className="app-container">
      <h1 className="app-title">Daily Weather Summaries</h1>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <table className="weather-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Date</th>
            <th>Avg Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Dominant Weather</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((summary, index) => (
            <tr key={index}>
              <td>{summary.city}</td>
              <td>{new Date(summary.date).toLocaleDateString()}</td>
              <td>{summary.avgTemp.toFixed(2)}</td>
              <td>{summary.maxTemp.toFixed(2)}</td>
              <td>{summary.minTemp.toFixed(2)}</td>
              <td>{summary.dominantWeather}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
