import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WeatherLocation from './index'
import './style.css'

class LocationList extends Component {
  constructor(props){
    super()
    this.state = {
      cities: props.cities,
      weatherType: props.weatherType,
      selectedCity: props.selectedCity
    }
    this.onSelectLocation = props.onSelectLocation
    this.handleSelectLocation = this.handleSelectLocation.bind(this)
  }
  
  handleSelectLocation(city, data, forecastData){
    this.onSelectLocation(city, data, forecastData)
    this.setState({
      selectedCity: city
    }) 
  }

  render(){
    const { selectedCity } = this.state
    const { data, forecastData, weatherType, cities } = this.props
    return (
      <div className="list-cities">
        {
          cities.map((city, index) => {
            return <WeatherLocation
              key={city.join(', ')}
              city={city[0]}
              country={city[1]}
              data={data}
              forecastData={forecastData}
              index={index}
              onSelectLocation={(city, data, forecastData) => { this.handleSelectLocation(city, data, forecastData)}}
              weatherType={weatherType}
              selectedCity={selectedCity}
            />
          })
        }
      </div>
    )
  }
 
}

LocationList.propTypes = {
  cities: PropTypes.array.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
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
  }),
  forecastData: PropTypes.arrayOf(PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    max_temperature: PropTypes.number.isRequired,
    min_temperature: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
  })),
}

export default LocationList