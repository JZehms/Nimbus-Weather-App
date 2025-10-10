import "leaflet/dist/leaflet.css";
import "./App.css";
import Search from "./Components/search/Search";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import Forecast from "./Components/Forecast/forecast";
import { weatherAPIURL, weatherAPIKey } from "./APIs/SearchAPI";
import { useState } from "react";
import WeatherMap from "./Components/WeatherMap/WeatherMap";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [mapCoords, setMapCoords] = useState({ lat: 34.0522, lon: -118.2437 });

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    setMapCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

    const currentWeatherFetch = fetch(
      `${weatherAPIURL}?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`
    );

    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async ([weatherResponse, forecastResponse]) => {
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        setCurrentWeather({ city: searchData.label, ...weatherData });
        setForecast({ city: searchData.label, ...forecastData });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1 className="app-title">Nimbus Weather Dashboard</h1>
        <h2 className="app-subTitle">
          Get real-time weather updates for any location
        </h2>
        <Search onSearchChange={handleOnSearchChange} />
        <WeatherMap
          lat={mapCoords.lat}
          lon={mapCoords.lon}
          cityName={currentWeather?.city}
          apiKey={weatherAPIKey}
        />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
