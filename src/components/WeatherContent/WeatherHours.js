import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { gradeAbbreviation, getGradeConversion, getIconByIdMaped } from '../../utils/utils'
import './style.css'

const WeatherHours = (props) => {
    const { temperature, weatherState, time, humidity, wind, pressure } = props.forecast
    const weatherType = props.weatherType
    const formatedDate = new Date(time)
    return (<div key={_.uniqueId("hours_")} className="weather-forecast-main">
        <span className="weather-forecast-item"><i className="icons-main-content fa fa-clock-o"></i>{formatedDate.getHours()}:00</span>
        <span className="weather-forecast-item"> <i className={getIconByIdMaped(weatherState, time) + ' icon-forecast'}></i>{getGradeConversion(temperature, weatherType) + ' ' + gradeAbbreviation(weatherType)}</span>
        <span className="weather-forecast-item"><i className="icons-main-content wi wi-raindrop"></i>{humidity} %</span>
        <span className="weather-forecast-item"><i className={`icons-main-content wi wi-wind-beaufort-${parseInt(wind, 10)}`}></i>{wind} m/s</span>
        <span className="weather-forecast-item"><i className="icons-main-content wi wi-barometer"></i>{pressure} bar</span>
      <br />
    </div>)
}

WeatherHours.propType = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      weatherType: PropTypes.string.isRequired,
      weatherState: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      wind: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    })
  )

}

export default WeatherHours