import "./CurrentWeather.css";
import PropTypes from "prop-types";

const CurrentWeather = ({ data }) => {
  return (
    <div className="current-weather">
      <div className="card-top">
        <div>
          <p className="city">{data.name}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          className="weather-icon"
          alt="weather"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        />
      </div>
      <div className="card-bottom">
        <p className="temperature">{Math.round(data.main.temp)}°F</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-span">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-span">Feels like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like)}°F</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-span">Wind</span>
            <span className="parameter-value">{data.wind.speed} mph</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-span">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-span">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
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
