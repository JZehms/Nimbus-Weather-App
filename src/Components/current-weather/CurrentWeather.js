import "./CurrentWeather.css";

const CurrentWeather = () => {
    return (
        <div className="current-weather">
            <div className="card-top">
                <p className="city">Las Vegas</p>
                <p className="weather-description">Sunny</p>
            </div>
            <img className="weather-icon" alt="weather"></img>
        </div>
    )
}

export default CurrentWeather;