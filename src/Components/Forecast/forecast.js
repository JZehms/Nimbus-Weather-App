import {
  Accordion,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItem,
} from "react-accessible-accordion";
import PropTypes from "prop-types";
import "./forecast.css";

const WeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const getDayName = new Date().getDay();
  const forecastDays = WeekDays.slice(getDayName, WeekDays.length).concat(
    WeekDays.slice(0, getDayName)
  );

  return (
    <div className="forecast">
      <h2 className="title">Daily Forecast</h2>
      <Accordion allowZeroExpanded>
        <div className="forecast-grid">
          {data.list.slice(0, 10).map((item, idx) => (
            <AccordionItem key={item.dt}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      className="weather-icon"
                      alt="weather"
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    <span className="day">{forecastDays[idx]}</span>
                    <span className="description">
                      {item.weather[0].description}
                    </span>
                    <span className="minMaxTemp">
                      {Math.round(item.main.temp_min)}°F /{" "}
                      {Math.round(item.main.temp_max)}°F{" "}
                    </span>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <span>Feels Like: </span>
                    <span>{Math.round(item.main.feels_like)}°F</span>
                  </div>
                  <div className="daily-details-grid-item">
                    <span>Wind Speed: </span>
                    <span>{item.wind.speed} mph</span>
                  </div>
                  <div className="daily-details-grid-item">
                    <span>Humidity: </span>
                    <span>{item.main.humidity}%</span>
                  </div>
                  <div className="daily-details-grid-item">
                    <span>Clouds: </span>
                    <span>{item.clouds.all}%</span>
                  </div>
                  <div className="daily-details-grid-item">
                    <span>Sea Level: </span>
                    <span>{item.main.sea_level} ft</span>
                  </div>
                  <div className="daily-details-grid-item">
                    <span>Pressure: </span>
                    <span>{item.main.pressure} hPa</span>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

Forecast.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Forecast;
