import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WeatherSettings from './components/WeatherSettings'
import WeatherContent from './components/WeatherContent'
import LocationList from './components/WeatherLocation/LocationList'
import OpenWeatherMap from './services/openweathermap'
import { WEATHER_TYPE_CELSIUS, WEATHER_TYPE_FAHRENHEIT, data, forecastData } from './constants/weather'

import './App.css'

const cities = [
    ['Caracas', 'VE'], 
    ['Buenos Aires', 'AR'], 
    ['Santiago', 'CL'],
    ['Brasilia', 'BR'],
    ['Bogota', 'CO'],
    ['London', 'UK']
]

class App extends Component {
  constructor(){
    super()
    this.state = {
      weatherType: WEATHER_TYPE_FAHRENHEIT,
      city: cities[0][0],
      country: cities[0][1],
      location: `${cities[0][0]}, ${cities[0][1]}`,
      data: data,
      forecastData: forecastData,
      error: false,
      message: ""
    }
    this.changeWeatherType = this.changeWeatherType.bind(this)
    this.selectLocation = this.selectLocation.bind(this)
  }

  changeWeatherType(wType){
    this.setState({
      weatherType: wType
    })
  }
  selectLocation(location, data, forecastData){
    this.setState({
      location,
      data,
      forecastData
    })
  }
  handleFade() {
    const elem = ReactDOM.findDOMNode(this);
    window.requestAnimationFrame(function () {
      elem.style.transform = "translateY(10px)"
      elem.style.transition = "transform 1.5s"
    })
  }

  componentDidMount() {
    this.handleFade()
    this.changeWeatherType(WEATHER_TYPE_CELSIUS)
    OpenWeatherMap.getCurrentDataByCity(this.state.city, this.state.country)
      .then(({ city, data }) => {
        OpenWeatherMap.getForecastDataByCity(this.state.city, this.state.country)
          .then((forecastData) => {
            this.setState({
              city,
              data,
              forecastData
            })
          })
          .catch((error) => {
            this.setState({
              error: true,
              message: error
            })
          })
      })      
  }

  render() {
    const { weatherType, location, data, forecastData, error, message } = this.state
    return (
      <div className="app-container">
        {
          (error)?
          <div>Ha ocurrido un error</div> 
          :
          <div>
              <WeatherSettings
                changeWeather={this.changeWeatherType}
                wType={weatherType}
              />
              <WeatherContent
                city={location}
                data={data}
                forecastData={forecastData}
                weatherType={weatherType} />
              <LocationList
                cities={cities}
                weatherType={weatherType}
                onSelectLocation={this.selectLocation}
                selectedCity={location}
              />   
          </div>
        }
      </div>
    )
  }
}

export default App
