import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            forecastVisibility: false
        }
        this.handleForecastVisibility = this.handleForecastVisibility.bind(this)
    }
    handleForecastVisibility(){
        this.setState({
            forecastVisibility: !this.state.forecastVisibility
        })
    }
    render(){
        const { temperature, weatherState, humidity, wind, time } = this.props.data
        const weatherType = this.props.weatherType
        const forecastData = this.props.forecastData
        const forecastVisibility = this.state.forecastVisibility
        return (
            <div className="weather-extra-info-container">
                { 
                    (!forecastVisibility)?
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
                <WeatherBottom handleForecastVisibility={this.handleForecastVisibility}/> 
            </div>
        )
    }
}


WeatherData.propTypes = {
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        weatherState: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.number.isRequired,
    }),
    forecastData: PropTypes.array.isRequired,
}

export default WeatherData