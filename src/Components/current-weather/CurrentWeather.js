import "./CurrentWeather.css";

const CurrentWeather = () => {
  return (
    <div className="current-weather">
      <div className="card-top">
        <div>
          <p className="city">Las Vegas</p>
          <p className="weather-description">Sunny</p>
        </div>
        <img
          className="weather-icon"
          alt="weather"
          src="/icons/sunny.png"
        ></img>
      </div>
      <div className="card-bottom">
        <p className="temperature">90°F</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">88°F</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">4 mph</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">18%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">15 hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
