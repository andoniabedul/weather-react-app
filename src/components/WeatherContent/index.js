import React, {Component} from 'react'
import PropTypes from 'prop-types'
import LocationTitle from '../WeatherLocation/LocationTitle'
import WeatherMain from './WeatherMain'
import WeatherForecast from './WeatherForecast'
import { getIconFlag } from '../../utils/utils'
import './style.css'

class WeatherContent extends Component {
  constructor({ city, data, forecastData, weatherType }){
    super()
    this.state = { 
      city, 
      data, 
      forecastData, 
      weatherType,
      showFullForecast: false
    }
    this.handleGetFullForecast = this.handleGetFullForecast.bind(this)
  }
  handleGetFullForecast(){
    this.setState({
      showFullForecast: !this.state.showFullForecast
    })
  }

  render(){
    const { showFullForecast } = this.state
    const {  weatherType, city, data, forecastData } = this.props
    return (
      <div className="main-content">
        <LocationTitle city={city} selectedIndicator={false} pinClass={getIconFlag(city)} />
        <div className="weather-main-content">
          { (showFullForecast)?
            <WeatherForecast forecastData={forecastData} weatherType={weatherType}/>
            :
            <WeatherMain data={data} weatherType={weatherType} />
          } 
        </div>
        <div className="weather-main-actions">
          <button onClick={this.handleGetFullForecast} className="weather-button-show">
            {(showFullForecast) ?
            "ATRÁS" :
            "PRONÓSTICO COMPLETO"
            }
          </button>
        </div>
      </div>
    )
  }
}

WeatherContent.propTypes = {
  city: PropTypes.string.isRequired,
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
  }).isRequired,
  forecastData: PropTypes.arrayOf(PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    max_temperature: PropTypes.number.isRequired,
    min_temperature: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
  })).isRequired,
}

export default WeatherContent