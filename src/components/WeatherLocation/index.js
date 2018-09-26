import React, { Component } from 'react'
import LocationTitle from './LocationTitle'
import WeatherData from './WeatherData'
import OpenWeatherMap from '../../services/openweathermap'
import {getNext5DaysForecastData} from '../../utils/utils'
import { data, forecastData } from '../../constants/weather'
import './style.css'


class WeatherLocation extends Component {
    constructor({ weatherType, city, country, onSelectLocation}){
        super();
        this.state = {
            error: null,
            message: null,
            type: weatherType,
            city: city,
            country: country,
            data: data,
            forecastData: forecastData,
            cssClass: 'weather-container'
        }
        this.selectLocation = onSelectLocation;
    }
    componentWillMount(){
        /*OpenWeatherMap.getCurrentDataByCity(this.state.city, this.state.country)
        .then(({city, data})=>{
            OpenWeatherMap.getForecastDataByCity(this.state.city, this.state.country)
                .then((forecastData) => {
                    this.setState({
                        city,
                        data,
                        forecastData
                    })
                })
                .catch((error)=>{
                    this.setState({
                        error: true,
                        message: error
                    })
                })
        })*/       
    }

    render(){
        const { onSelectLocation, weatherType, selectedCity } = this.props
        const { city, country, data, forecastData, cssClass, error } = this.state;
        console.log("2: " + this.state.city)
        console.log("1: "+ this.props.country)
            return (
                <div className={`${cssClass}`} onClick={() => { onSelectLocation(city, data, forecastData) }}>
                    <LocationTitle city={city} selectedIndicator={(city === selectedCity) ? true : false} pinClass="fa fa-map-marker icon-pin map-pin" />
                    <WeatherData
                        weatherType={weatherType}
                        data={data}
                        forecastData={getNext5DaysForecastData(forecastData)}
                        selectedCity={selectedCity}
                    />
                </div>
            )
        
    }
} 



export default WeatherLocation