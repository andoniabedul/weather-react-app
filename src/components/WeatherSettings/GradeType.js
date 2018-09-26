import React, { Component } from 'react'
import {WEATHER_TYPE_CELSIUS, WEATHER_TYPE_FAHRENHEIT } from '../../constants/weather'
import { gradeAbbreviation } from '../../utils/utils'


class GradeType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.wType,
    }
    this.changeGrade = this.changeGrade.bind(this)
    this.changeWeather = props.changeWeather
  }
  
  componenteWillUpdate(){
    this.props.changeWeather(this.state.type)
  }

  changeGrade(){
    this.changeWeather(this.state.type)
    if(this.state.type === WEATHER_TYPE_CELSIUS){
      this.setState({
        type: WEATHER_TYPE_FAHRENHEIT
      })
    } else {
      this.setState({
        type: WEATHER_TYPE_CELSIUS
      })
    }
  }

  render(){
    return (
      <div className="weather-grade-type">
        <input 
          onChange={this.changeGrade} 
          id="cmn-toggle-4" 
          className="cmn-toggle cmn-toggle-round-flat" 
          type="checkbox" 
          checked={(this.state.type === WEATHER_TYPE_CELSIUS? true : false)} 
        />
        <label htmlFor="cmn-toggle-4">
          {
            (this.state.type === WEATHER_TYPE_CELSIUS) ?
              gradeAbbreviation(WEATHER_TYPE_CELSIUS)
              :
              gradeAbbreviation(WEATHER_TYPE_FAHRENHEIT)
          }
        </label>
      </div>
    )
  }
}


export default GradeType