import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {getNext5DaysForecastData} from '../../../utils/utils'
import WeatherTemperature from './WeatherTemperature'
import WeatherForecast from './WeatherForecast'
import WeatherBottom from './WeatherBottom'
import './style.css'


class WeatherData extends Component {
    constructor(props){
        super()
        this.state = {
            data: props.data,
            weatherType: props.weatherType,
            forecastData: props.forecastData,
            forecastVisibility: false,
            onSelectLocation: props.onSelectLocation
        }
        this.onSelectLocation = props.onSelectLocation
        this.selectLocation = this.selectLocation.bind(this)
        this.handleForecastVisibility = this.handleForecastVisibility.bind(this)
    }
    handleForecastVisibility(){
        this.setState({
            forecastVisibility: !this.state.forecastVisibility
        })
    }
    selectLocation(city, data, forecastData){
        this.onSelectLocation(city, data, forecastData)
    }
    render(){
        const forecastVisibility = this.state.forecastVisibility
        const {city, data, weatherType } = this.props
        const { temperature, weatherState, humidity, wind, time } = data
        const forecastData = getNext5DaysForecastData(this.props.forecastData)
        return (
            <div className="weather-extra-info-container">
                <div onClick={() => { this.selectLocation(city, data, forecastData) }}>
                    {
                        (!forecastVisibility) ?
                            <WeatherTemperature
                                temperature={temperature}
                                weatherType={weatherType}
                                weatherState={weatherState}
                                humidity={humidity}
                                wind={wind}
                                time={time}
                            />
                            :
                            <WeatherForecast
                                data={forecastData}
                                weatherType={weatherType}
                                weatherState={weatherState}
                            />
                    }
                </div>
                <WeatherBottom 
                handleForecastVisibility={this.handleForecastVisibility}/> 
            </div>
        )
    }
}


WeatherData.propTypes = {
    city: PropTypes.string.isRequired,
    weatherType: PropTypes.string.isRequired,
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        weatherState: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.number.isRequired,
        max_temperature: PropTypes.number,
        min_temperature: PropTypes.number,
        pressure: PropTypes.number,
        sunrise: PropTypes.number,
        sunset: PropTypes.number,
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
    })).isRequired
}

export default WeatherData