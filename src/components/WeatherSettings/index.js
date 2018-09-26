import React from 'react'
import GradeType from './GradeType'


const WeatherSettings = (props)=>(
  <div className="weather-settings">
    <span className="menu-title">
      Weather App
    </span>  
    <GradeType changeWeather={props.changeWeather} wType={props.wType} />
  </div>
)

export default WeatherSettings