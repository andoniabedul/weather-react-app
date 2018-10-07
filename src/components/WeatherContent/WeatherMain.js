import React from 'react'
import PropTypes from 'prop-types'
import { gradeAbbreviation, getGradeConversion, getDescriptionById, getIconByIdMaped, getDateForSun, getFormatedDate } from '../../utils/utils'
import './style.css'

const WeatherMain = (props) => {
  const { data, weatherType } = props
  return (
        <div className="weather-current-content">
          <span className="weather-main-description">
            { 
                (data.wind > 5)?
              `${getDescriptionById(data.weatherState)} CON VIENTO`
              :
              getDescriptionById(data.weatherState)
            }
          </span>
          <div className="weather-main-temp">
            <i className={getIconByIdMaped(data.weatherState, data.time)}></i>
            {getGradeConversion(data.temperature, weatherType)}
            <span className="weather-type"> {gradeAbbreviation(weatherType)}</span>
          </div>
          <div className="weather-main-info">
            <div className="weather-main-info-left">
              <h2 className="weather-main-item"><i className="icons-main-content wi wi-raindrop"></i>Humedad: {data.humidity} %</h2>
              <h2 className="weather-main-item"><i className={`icons-main-content wi wi-wind-beaufort-${parseInt(data.wind, 10)}`}></i>Viento: {data.wind} m/s</h2>
              <h2 className="weather-main-item"><i className="icons-main-content wi wi-barometer"></i>Presión: {data.pressure} bar</h2>
            </div>
            <div className="weather-main-info-right">
              <h2 className="weather-main-item"><i className="icons-main-content wi wi-sunset"></i>Puesta: {getDateForSun(data.sunset)}</h2>
              <h2 className="weather-main-item"><i className="icons-main-content wi wi-sunrise"></i>Salida: {getDateForSun(data.sunrise)}</h2>
              <h2 className="weather-main-item"><i className="icons-main-content fa fa-calendar"></i>Fecha: {getFormatedDate(data.time)}</h2>
            </div>
          </div>
        </div>
  )
}
WeatherMain.propTypes = {
  weatherType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    max_temperature: PropTypes.number.isRequired,
    min_temperature: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
}
export default WeatherMain