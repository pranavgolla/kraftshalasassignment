import React, { useState, useEffect, useCallback } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeatherByCoordinates = useCallback(
    (latitude, longitude, isCurrent = false) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d885aa1d783fd13a55050afeef620fcb`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod !== 200) {
            setError(data.message);
          } else {
            const kelvin = data.main.temp;
            const celcius = kelvin - 273.15;
            const weatherData = {
              location: data.name,
              temperature: Math.round(celcius),
              description: data.weather[0].description,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
            };
            if (isCurrent) {
              setCurrentLocation(weatherData);
            } else {
              setLocations([weatherData]);
            }
            setError("");
          }
        })
        .catch((error) =>
          setError("Unable to fetch weather for current location")
        );
    },
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude, true);
      },
      (error) =>
        setError(
          "Geolocation is not enabled. Please enable to get current location."
        )
    );

    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchWeatherByCoordinates]);

  const fetchWeatherByCity = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(data.message);
        } else {
          const kelvin = data.main.temp;
          const celcius = kelvin - 273.15;
          const weatherData = {
            location: data.name,
            temperature: Math.round(celcius),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
          };
          setLocations([weatherData]);
          setError("");
        }
      })
      .catch((error) => setError("An error occurred. Please try again."));
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (city === '') {
      setError("Please enter a location name");
    } else {
      fetchWeatherByCity(city);
      setCity("");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <button
              className={` ${darkMode ? "k1" : "k2"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? "Light" : "Dark"} Mode
            </button>
            <div className="current-info">
              {currentLocation && (
                <WeatherCard
                  data={currentLocation}
                  isCurrent={true}
                  dateTime={dateTime}
                />
              )}
              {error && <h3 className="error">{error}</h3>}
            </div>
            <form onSubmit={submitHandler}>
              <input
                size="30"
                type="text"
                name="city"
                onChange={changeHandler}
                value={city}
                placeholder="Enter city or zip code"
              />{" "}
              <br />
              <br />
              <input type="submit" value="Get Temperature" />
            </form>
            <div className="locations">
              {locations.map((location, index) => (
                <WeatherCard key={index} data={location} />
              ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;
