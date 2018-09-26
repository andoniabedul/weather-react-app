import React from 'react'
import PropType from 'prop-types'
import { gradeAbbreviation, getGradeConversion, getDayOfTheWeek, getIconByIdMaped, getAbbreviateDate, getForecastbyDays } from '../../utils/utils'
import './style.css'

const WeatherForecast = (props) => {
  const { forecastData, weatherType } = props
  const byDays = getForecastbyDays(forecastData);
  return (
    <div className="weather-forecast-content">
      {
        forecastData.map((dayForecast) => {
          const { temperature, weatherState, time, humidity, wind, pressure } = dayForecast
          const formatedDate = new Date(time)
          return <div key={temperature + '-' + time} className="weather-forecast-main">
            <div className="weather-forecast-day-main">
              {getDayOfTheWeek(formatedDate.getDay()) + ' ' + getAbbreviateDate(formatedDate)}
            </div>
            <div className="weather-forecast-temperature-main">
              <span className="weather-forecast-item"> <i className={getIconByIdMaped(weatherState) + ' icon-forecast'}></i>{getGradeConversion(temperature, weatherType)}</span>
              <span className="weather-forecast-item"> {gradeAbbreviation(weatherType)}</span>
              <span className="weather-forecast-item"><i className="icons-main-content wi wi-raindrop"></i>Humedad: {humidity} %</span>
              <span className="weather-forecast-item"><i className={`icons-main-content wi wi-wind-beaufort-${parseInt(wind, 10)}`}></i>Viento: {wind} m/s</span>
              <span className="weather-forecast-item"><i className="icons-main-content wi wi-barometer"></i>Presión: {pressure} bar</span>
            </div>
            <br />
          </div>
        })
      }
    </div>
  )
}

WeatherForecast.propTypes = {
  city: PropType.string.isRequired,
}

export default WeatherForecast