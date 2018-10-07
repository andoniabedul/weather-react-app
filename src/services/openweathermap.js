
import { WEATHER_TYPE_CELSIUS } from '../constants/weather'
import { gradeConverterFromKelvin, getTimeFromUnixTimestamp } from '../utils/utils'

const CURRENT = 'weather';
const FORECAST = 'forecast';

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/'
const WEATHER_APP_ID = process.env.REACT_APP_OPENWEATHERMAP_APPID

const getUrlCurrentDataByCity = (city, country) => `${BASE_API_URL}${CURRENT}?q=${city},${country}&APPID=${WEATHER_APP_ID}`
const getUrlCurrentDataByCoordinates = (latitude, longitude) => `${BASE_API_URL}${CURRENT}?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_APP_ID}`

const getUrlForecastDataByCity = (city, country) => `${BASE_API_URL}${FORECAST}?q=${city},${country}&APPID=${WEATHER_APP_ID}`
const getUrlForecastDataByCoordinates = (latitude, longitude) => `${BASE_API_URL}${FORECAST}?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_APP_ID}`

const getCurrentDataByCoordinates = (latitude, longitude) =>{
  const URL = getUrlCurrentDataByCoordinates(latitude, longitude)
  return new Promise((resolve, reject)=>{
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const weatherData = handleResponse(response)
        resolve(weatherData)
      })
      .catch((error) => reject(error))
  });
}

const getCurrentDataByCity = (city, country) =>{
  const URL = getUrlCurrentDataByCity(city.split(',')[0], country)
  return new Promise((resolve, reject)=>{
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const weatherData = handleResponse(response)
        resolve(weatherData)
      })
      .catch((error) => reject(error))
  });
}


const getForecastDataByCoordinates = (latitude, longitude) => {
  const URL = getUrlForecastDataByCoordinates(latitude, longitude)
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const forecastData = response.list.map((dayForecast) => {
          const formatedResponse = handleResponse(dayForecast)
          return formatedResponse.data
        })
        resolve(forecastData)
      })
      .catch((error) => reject(error))
  });
}

const getForecastDataByCity = (city, country) => {
  const URL = getUrlForecastDataByCity(city, country)
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        if (!isError(response)){
          resolve(
            response.list.map((dayForecast) => {
              dayForecast.name = city
              dayForecast.sys.country = country
              const formatedResponse = handleResponse(dayForecast)
              return formatedResponse.data
            })
          )
        } else {
          reject(handleResponse(response))
        }
      })
      .catch((error) => reject(error))
  });
}

function handleResponse(response){
  if(!isError(response)){
    return {
      city: `${response.name}, ${response.sys.country}`,
      data: {
        temperature: gradeConverterFromKelvin(response.main.temp, WEATHER_TYPE_CELSIUS),
        weatherState: response.weather[0].id,
        humidity: response.main.humidity,
        wind: parseInt(parseInt(response.wind.speed, 10).toFixed(2), 10),
        max_temperature: gradeConverterFromKelvin(response.main.temp_max, WEATHER_TYPE_CELSIUS),
        min_temperature: gradeConverterFromKelvin(response.main.temp_min, WEATHER_TYPE_CELSIUS),
        pressure: response.main.pressure,
        deg: response.wind.deg,
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset,
        time: getTimeFromUnixTimestamp(response.dt)
      }
    }
  } else {
    return {
      error: 'Parece que ocurre un error consultando el servidor. Intente más tarde.',
      cod: (response.hasOwnProperty("cod"))? response.cod : ""
    }
  }
  
}


function isError(response){
  if(response.hasOwnProperty("list") || response.hasOwnProperty("main")){
    return false
  }
  return true
}

const OpenWeatherMap = {
  getCurrentDataByCity,
  getForecastDataByCity,
  getCurrentDataByCoordinates,
  getForecastDataByCoordinates
}

export default OpenWeatherMap