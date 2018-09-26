import React from 'react'
import PropTypes from 'prop-types'

const WeatherExtraInfo = (props) => {
    const { humidity, wind } = props
    return (
        <div className="weather-data-extra-info">
            <i className="wi wi-raindrop icon-humidity"></i>
            <span className="span-weather-extra-info">  
                {`Humedad: ${humidity} % `}
            </span>
            <br />
            <i className="wi wi-cloudy-windy icon-wind"></i> 
            <span className="span-weather-extra-info">    
                {`Viento: ${wind} m/s`}
            </span>
        </div>
    )   
}

WeatherExtraInfo.propType = {
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.string.isRequired,
}
export default WeatherExtraInfo