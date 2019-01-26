import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WeatherSettings from './components/WeatherSettings'
import WeatherContent from './components/WeatherContent'
import LocationList from './components/WeatherLocation/LocationList'
import Google from './services/google'
import { getIpLocation } from './services/ip'
import { WEATHER_TYPE_CELSIUS, data, forecastData } from './constants/weather'
import dotenv from 'dotenv'
import './App.css'

const predefinedCities = [
    ['Caracas', ' VE'], 
    ['Buenos Aires', ' AR'], 
    ['Santiago', ' CL'],
    ['Brasilia', ' BR'],
    ['Bogota', ' CO'],
    ['London', ' GB'],
    ['Madrid', ' ES'],
    ['Paris', ' FR'],
    ['Berlin', ' GR'],
    ['Tokio', ' JP'],
    ['Shangai', ' CN'],
    ['New York', ' EU'],
    ['Washintong', ' EU']
]

class App extends Component {
  constructor(){
    super()
    this.state = {
      weatherType: WEATHER_TYPE_CELSIUS,
      cities: [],
      city: '',
      country: '',
      location: ``,
      data: data,
      forecastData: forecastData,
      predefinedCities: predefinedCities,
      error: false,
      message: ""
    }
    dotenv.config()
    this.changeWeatherType = this.changeWeatherType.bind(this)
    this.selectLocation = this.selectLocation.bind(this)
    this.getLocation = this.getLocation.bind(this)
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
  getLocation(){
       
  }

  componentDidMount() {
    this.handleFade()
    getIpLocation()
      .then(({ city, country, latitude, longitude }) => {
        Google.getCitiesByCoordinates(latitude, longitude)
          .then((cities) => {
            const formatedCities = cities.map((city, i)=>{
              return [city['long_name'], ` ${country}`]
            })
            this.setState({
              location: `${city}, ${country}`,
              city: city,
              country: country,
              cities: formatedCities
            })
          })
      })
  }

  render() {
    const { weatherType, location, data, forecastData, error, cities, predefinedCities } = this.state
    return (
      <div className="app-container">
        {
          (error)?
          <div>Ha ocurrido un error</div> 
          :
          (cities.length === 0)?
            <div className="loading-div"><h3>Cargando</h3></div>
            :
            <div>
                <WeatherSettings
                  changeWeather={this.changeWeatherType}
                  wType={weatherType}
                  cities={predefinedCities}
                  selectedCities={cities}
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
