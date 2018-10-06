import React from 'react'
import PropTypes from 'prop-types'
import { 
    getDayOfTheWeek, 
    gradeAbbreviation, 
    getIconByIdMaped, 
    getAbbreviateDate,
    getGradeConversion } from '../../../utils/utils'

const WeatherForecast = (props) => {
  const data = props.data
  const weatherType = props.weatherType
  return (
    <div className="weather-extra-info-forecast">
      <div className="weather-forecast-list active">
        { 
          data.map((dayForecast) => {
          const { temperature, weatherState, time } = dayForecast
          const formatedDate = new Date(time)
          return <div key={temperature + '-' + time} className="weather-forecast">
            <div className="weather-forecast-day">
            { getDayOfTheWeek(formatedDate.getDay()) + ' ' + getAbbreviateDate(formatedDate)}
            </div>
            <div className="weather-forecast-temperature">
              <i className={getIconByIdMaped(weatherState, time) + ' icon-forecast'}></i>
              {getGradeConversion(temperature, weatherType)}
              <span className="weather-forecast-type"> {gradeAbbreviation(weatherType)}</span>
            </div>
          </div>
          })
        }
      </div>
    </div>
  )
}

WeatherForecast.propType = {
  weatherType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      weatherType: PropTypes.string.isRequired,
      weatherState: PropTypes.number.isRequired,
      max_temperature: PropTypes.number.isRequired,
      min_temperature: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired
  
}
export default WeatherForecast