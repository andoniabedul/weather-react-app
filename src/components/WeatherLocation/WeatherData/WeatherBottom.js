import React from 'react'
import PropTypes from 'prop-types'

const WeatherBottom = (props) => {
  const handleForecastVisibility = props.handleForecastVisibility
  return (
    <div className="weather-bottom-info-container">
      <button 
        className="weather-button-show" 
        onClick={() =>{ handleForecastVisibility() }}>
           SIGUIENTE 5 DÍAS 
        </button>
    </div>   
  )
}

WeatherBottom.propType = {
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.string.isRequired,
}
export default WeatherBottom