import React, { Component } from 'react'
import PropType from 'prop-types'
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
                key={day}
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
              return <WeatherHours forecast={forecast} weatherType={weatherType} />
            })
          }
        </div>
       
        
      </div>
    )
  }
}

WeatherForecast.propTypes = {
  city: PropType.string.isRequired,
}

export default WeatherForecast