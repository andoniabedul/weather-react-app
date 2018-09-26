import React, { Component } from 'react'
import PropType from 'prop-types'
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
    const { cities, selectedCity } = this.state
    const weatherType = this.props.weatherType
    console.log("cities: " + cities[0])
    return (
      <div className="list-cities">
        {
          cities.map((city) => {
            return <WeatherLocation
              key={city.join(', ')}
              city={city[0]}
              country={city[1]}
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
  cities: PropType.array.isRequired,
  onSelectLocation: PropType.func.isRequired,
}

export default LocationList