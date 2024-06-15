# Weather App

A simple and intuitive weather application built with React, providing current weather information and additional details such as humidity and wind speed. The application supports both dark and light modes and allows users to view weather information for multiple locations simultaneously.

## Features

- Current Location Weather: Automatically fetches and displays weather information based on the user's current location.
- Search Functionality: Users can enter a city name or zip code to fetch and display weather information for that location.
- Multiple Locations: Display weather information for multiple locations at the same time.
- Dark/Light Mode: Toggle between dark and light modes for better user experience.
- Additional Weather Information: Displays additional details such as humidity, wind speed, and weather description.
- Loader**: Displays a loading spinner while fetching weather data.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/pranavgolla/kraftshalasassignment.git
   cd kraftshalasassignment

2. Install dependencies:

    npm install

3. Start the development server:

    npm start

    The application will be available at http://localhost:3000.

Usage
Current Location Weather: The app will automatically request access to your location and display the weather information for your current location.

Search for Weather Information:

Enter a city name or zip code in the input field.
Click the "Get Temperature" button to fetch and display the weather information for the entered location.
Dark/Light Mode:

Click the "Toggle to Dark/Light Mode" button to switch between dark and light modes.

API Integration
This application uses the OpenWeather API to fetch weather data.

API Key: You will need an API key from OpenWeather. Replace the appid parameter in the API calls with your own API key.

<!-- fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`) -->

