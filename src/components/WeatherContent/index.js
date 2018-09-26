import React, {Component} from 'react'
import PropType from 'prop-types'
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
    console.log(this.props)
    const { showFullForecast, city, data, forecastData } = this.state
    const {  weatherType } = this.props
    console.log("city state: "+ this.state.city)
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
  city: PropType.string.isRequired,
}

export default WeatherContent