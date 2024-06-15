import React from 'react';
import './Weather.css';

const WeatherCard = ({ data, isCurrent = false, dateTime }) => {
  return (
    <div className={`weather-card ${isCurrent ? 'current-location' : ''}`}>
      {isCurrent && (
        <div>
          <h2>{data.location}</h2>
          <h3>{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</h3>
        </div>
      )}
      {!isCurrent && <h3>{data.location}</h3>}
      <h3>Temperature: {data.temperature}°C</h3>
      <h4>{data.description}</h4>
      <h4>Humidity: {data.humidity}%</h4>
      <h4>Wind Speed: {data.windSpeed} m/s</h4>
    </div>
  );
};

export default WeatherCard;
