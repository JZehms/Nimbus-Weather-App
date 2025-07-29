import "./App.css";
import Search from "./Components/search/Search";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import Forecast from './Components/Forecast/forecast';
import { weatherAPIURL, weatherAPIKey } from "./APIs/SearchAPI";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

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

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
