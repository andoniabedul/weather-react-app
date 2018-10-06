import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import WeatherHours from './WeatherHours'
import { getAbbreviateDate, getForecastbyDays } from '../../utils/utils'
import './style.css'

class WeatherForecast extends Component {
  constructor(props){
    super()
    this.state = {
      selectedDay: Object.keys(getForecastbyDays(props.forecastData))[0],
    }
    this.selectDay = this.selectDay.bind(this)
  }
  selectDay(day){
    this.setState({
      selectedDay: day
    })
  }
  render(){
    const { selectedDay } = this.state
    const { forecastData, weatherType } = this.props
    const byDays = getForecastbyDays(forecastData)
    const daysOfWeek = Object.keys(byDays)
    return (
      <div className="weather-forecast-content">
        <div className="weather-forecast-days-list">
          {
            daysOfWeek.map((day) => {
              const date = getAbbreviateDate(new Date(byDays[day][0]['time']))
              const css = (day === selectedDay)? " active" : ""
              
              return <div
                key={_.uniqueId(`main_forecast_${day}_`)}
                onClick={() => { this.selectDay(day) }}
                className={`weather-forecast-days ${css}`}>
                {day}
                <br />
                {date}
              </div>
            })
          }
        </div>
        <div className="weather-forecast-hours-list">
          {
            byDays[selectedDay].map((forecast) => {
              return <WeatherHours 
                key={_.uniqueId(`main_forecast_hours_`)}
                forecast={forecast} 
                weatherType={weatherType} 
              />
            })
          }
        </div>
       
        
      </div>
    )
  }
}

WeatherForecast.propTypes = {
  forecastData: PropTypes.arrayOf(PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    max_temperature: PropTypes.number.isRequired,
    min_temperature: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
  })).isRequired,
}

export default WeatherForecast