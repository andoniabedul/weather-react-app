import React, {Component} from 'react'
import { getIconFlag } from '../../utils/utils'
import GradeType from './GradeType'

class WeatherSettings extends Component {
  constructor(){
    super()
    this.state = {
      showCities: false
    }
    this.showCities = this.showCities.bind(this)
  }
  showCities(){
    this.setState({
      showCities: !this.state.showCities
    })
  }
  render(){
    const { showCities } = this.state
    const {changeWeather, wType, cities, selectedCities } = this.props
    return (
    <div className="weather-settings">
      <span className="menu-title">
          Weather App
      </span>
      <GradeType changeWeather={changeWeather} wType={wType} />
        <button className="button-add-cities" onClick={() => { this.showCities() }}><i className="fa fa-plus"></i> CIUDADES</button>
      {
        (showCities)?
        <div className="modal">
          <div className="header">
            {
              selectedCities.map((location)=>{
                    return (
                      <div 
                        className="choosed-cities"
                        key={`${location[0]}-${location[1]}-selected-cities`}
                      >
                        <i className={`${getIconFlag(location.join(','))} icon-predefined-cities`}></i>
                        {`${location[0]}, ${location[1]}`}
                      </div>
                    )
              })
            }
          </div>
          <br/>
          <div>
            <div className="modal-center">
              {
                cities.map((location)=>{
                      return(
                        <div 
                          className="predefined-cities" 
                          style={{margin: '0 auto'}}
                          key={`${location[0]}-${location[1]}-cities`}
                        >
                          <i className={`${getIconFlag(location.join(','))} icon-predefined-cities`}></i>
                          {`${location[0]}, ${location[1]}`}
                        </div>
                      )
                })
              }
            </div>
          </div>
          <div className="footer">
            <button className="button" onClick={() => this.showCities()}>
              CLOSE
            </button>
          </div>
        </div>
        :
        ""
      }
    </div>
    )
  }
}

export default WeatherSettings