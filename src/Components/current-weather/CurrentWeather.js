import "./CurrentWeather.css";
import PropTypes from "prop-types";

const CurrentWeather = ({ data }) => {
  const { name, weather, main, wind } = data;
  const { description, icon } = weather[0];

  return (
    <div className="current-weather">
      <div className="card-top">
        <div className="location-info">
          <p className="city">{name}</p>
          <p className="weather-description">{description}</p>
        </div>
        <img
          className="weather-icon"
          alt={description}
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        />
      </div>

      <div className="card-bottom">
        <p className="temperature">{Math.round(main.temp)}°F</p>

        <div className="details-container">
          <span className="details-header">Details</span>
          <div className="details-grid">
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(main.feels_like)}°F
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{wind.speed} mph</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CurrentWeather;
