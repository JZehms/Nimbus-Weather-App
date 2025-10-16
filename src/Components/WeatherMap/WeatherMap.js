import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const WEATHER_LAYERS = {
  none: null,
  clouds: "clouds",
  precipitation: "precipitation",
  temp: "temp",
  wind: "wind",
  pressure: "pressure",
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

function WeatherMap({ lat, lon, cityName, apiKey }) {
  const DEFAULT_CENTER = [34.0522, -118.2437];
  const [weatherLayer, setWeatherLayer] = useState("none");

  const center =
    lat !== undefined && lon !== undefined ? [lat, lon] : DEFAULT_CENTER;

  return (
    <div style={{ position: "relative", margin: "20px 0" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "10px",
          padding: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            marginBottom: "5px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#555",
          }}
        >
          Weather Layer
        </div>
        <select
          value={weatherLayer}
          onChange={(e) => {
            setWeatherLayer(e.target.value);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "2px solid #ddd",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "white",
          }}
        >
          <option value="none">🗺️ Base Map</option>
          <option value="clouds">☁️ Clouds</option>
          <option value="precipitation">🌧️ Precipitation</option>
          <option value="temp">🌡️ Temperature</option>
          <option value="wind">💨 Wind Speed</option>
          <option value="pressure">📊 Pressure</option>
        </select>

        <div style={{ marginTop: "8px", fontSize: "11px", color: "#666" }}>
          {weatherLayer === "none" ? "No overlay" : `Active: ${weatherLayer}`}
        </div>
      </div>

      {cityName && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "8px",
            padding: "8px 15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontSize: "14px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          📍 {cityName}
        </div>
      )}

      <div
        style={{
          height: "450px",
          width: "100%",
          maxWidth: "900px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          borderRadius: "15px",
          overflow: "hidden",
          border: "3px solid rgba(255,255,255,0.3)",
        }}
      >
        <MapContainer
          center={center}
          zoom={10}
          style={{
            height: "100%",
            width: "100%",
          }}
          scrollWheelZoom={true}
        >
          <ChangeView center={center} zoom={10} />

          <TileLayer
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {weatherLayer !== "none" && WEATHER_LAYERS[weatherLayer] && (
            <TileLayer
              key={`weather-${weatherLayer}`}
              url={`https://tile.openweathermap.org/map/${WEATHER_LAYERS[weatherLayer]}/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution="Weather &copy; OpenWeatherMap"
              opacity={0.8}
              eventHandlers={{
                tileerror: (error) => {
                  console.error("Tile loading error:", error);
                  console.error("Failed layer:", weatherLayer);
                },
              }}
            />
          )}

          {lat && lon && (
            <Marker position={[lat, lon]}>
              <Popup>
                <div style={{ textAlign: "center", padding: "5px" }}>
                  <strong>{cityName || "Selected Location"}</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {lat.toFixed(4)}, {lon.toFixed(4)}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

WeatherMap.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  cityName: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default WeatherMap;
