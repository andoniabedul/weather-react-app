import React, { Component } from 'react'
import LocationTitle from './LocationTitle'
import WeatherData from './WeatherData'
import OpenWeatherMap from '../../services/openweathermap'
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
            cssClass: 'weather-container',
        }
        this.onSelectLocation = onSelectLocation;
        this.selectLocation = this.selectLocation.bind(this)
    }
    componentWillMount(){
        OpenWeatherMap.getCurrentDataByCity(this.state.city, this.state.country)
        .then(({city, data})=>{
            OpenWeatherMap.getForecastDataByCity(this.state.city, this.state.country)
                .then((forecastData) => {
                    if (this.props.index === 0) {
                        this.selectLocation(city, data, forecastData)
                    }
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
        })     
    }
    selectLocation(city, data, forecastData){
        this.onSelectLocation(city, data, forecastData)
    }

    render(){
        const { weatherType, selectedCity } = this.props
        const { city, data, forecastData, cssClass } = this.state;
        return (
            <div className={`${cssClass}`} >
                <LocationTitle city={city} selectedIndicator={(city === selectedCity) ? true : false} pinClass="fa fa-map-marker icon-pin map-pin" />
                <WeatherData
                    weatherType={weatherType}
                    city={city}
                    data={data}
                    onSelectLocation={this.selectLocation}
                    forecastData={forecastData}
                    selectedCity={selectedCity}
                />
            </div>
        )
        
    }
} 



export default WeatherLocation