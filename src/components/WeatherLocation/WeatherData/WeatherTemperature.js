import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WeatherExtraInfo from './WeatherExtraInfo'
import { gradeAbbreviation, getIconByIdMaped, getGradeConversion } from '../../../utils/utils'

class WeatherTemperature extends Component {
    render(){
        const { temperature, weatherState, weatherType, humidity, wind, time } = this.props;
        return (
            <div className="weather-extra-info-current">
                <div className="weather-data-temperature">
                    <span className="span-temperature">
                        <i className={getIconByIdMaped(weatherState, time)}></i>
                        {getGradeConversion(temperature, weatherType)}
                        <span className="weather-type"> {gradeAbbreviation(weatherType)}</span>
                    </span>
                </div>
                <WeatherExtraInfo
                    humidity={humidity}
                    wind={wind}
                />
            </div>
        )
    }
}

WeatherTemperature.propTypes = {
    temperature: PropTypes.number.isRequired,
    weatherType: PropTypes.string.isRequired,
    weatherState: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
}

export default WeatherTemperature