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
  const [locationLoading, setLocationLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [tempUnit, setTempUnit] = useState("imperial");

  const fetchWeatherData = (lat, lon, cityName, unit = tempUnit) => {
    setMapCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

    const currentWeatherFetch = fetch(
      `${weatherAPIURL}?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=${unit}`
    );

    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=${unit}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async ([weatherResponse, forecastResponse]) => {
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        setCurrentWeather({ ...weatherData, city: cityName });
        setForecast({ ...forecastData, city: cityName });
        setHasSearched(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherData(lat, lon, "Your Location");
          setLocationLoading(false);
        },
        (error) => {
          console.log("Location access denied:", error.message);
          alert(
            "Unable to get your location. Please search for a city instead."
          );
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  const toggleTempUnit = () => {
    const newUnit = tempUnit === "imperial" ? "metric" : "imperial";
    setTempUnit(newUnit);

    // Refetch with new unit if I have current weather
    if (hasSearched && currentWeather) {
      const lat = mapCoords.lat;
      const lon = mapCoords.lon;
      const cityName = currentWeather.city;

      fetchWeatherData(lat, lon, cityName, newUnit);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <button
          onClick={toggleTempUnit}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            borderRadius: "25px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "700",
            transition: "all 0.3s",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
          onMouseOver={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.3)";
            e.target.style.transform = "scale(1.05)";
          }}
          onFocus={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.3)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "scale(1)";
          }}
          onBlur={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "scale(1)";
          }}
        >
          {tempUnit === "imperial" ? "°F" : "°C"}
        </button>

        <h1 className="app-title">Nimbus Weather Dashboard</h1>
        <h2 className="app-subTitle">
          Get real-time weather updates for any location
        </h2>

        <Search onSearchChange={handleOnSearchChange} />

        {!hasSearched && !locationLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              margin: "20px 0",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              border: "2px dashed rgba(255, 255, 255, 0.3)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>📍</div>
            <h3
              style={{
                color: "white",
                marginBottom: "10px",
                fontSize: "20px",
              }}
            >
              Discover Your Local Weather
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              Get personalized weather updates for your current location
            </p>
            <button
              onClick={handleUseMyLocation}
              style={{
                padding: "12px 30px",
                borderRadius: "25px",
                border: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onFocus={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onBlur={(e) => (e.target.style.transform = "scale(1)")}
            >
              📍 Use My Location
            </button>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                marginTop: "15px",
                fontSize: "12px",
              }}
            >
              or search for any city above
            </p>
          </div>
        )}

        {locationLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "white",
              fontSize: "16px",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                marginBottom: "10px",
              }}
            >
              📍
            </div>
            Getting your location...
          </div>
        )}

        {hasSearched && (
          <>
            {currentWeather && (
              <CurrentWeather data={currentWeather} tempUnit={tempUnit} />
            )}
            {forecast && <Forecast data={forecast} tempUnit={tempUnit} />}
            <WeatherMap
              lat={mapCoords.lat}
              lon={mapCoords.lon}
              cityName={currentWeather?.city}
              apiKey={weatherAPIKey}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
