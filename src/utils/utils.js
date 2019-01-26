import {
  CLEAR_SKY,
  FEW_CLOUDS,
  SCATTERED_CLOUDS,
  BROKEN_CLOUDS,
  SHOWER_RAIN,
  RAIN,
  THUNDERSTORM,
  SNOW,
  MIST,
  HAZE,
  FOG,
  ID_THUNDERSTORM,
  ID_DRIZZLE,
  ID_RAIN,
  ID_SNOW,
  ID_ATMOSPHERE,
  ID_CLEAR,
  ID_CLOUDS,
  WEATHER_TYPE_CELSIUS,
  WEATHER_TYPE_FAHRENHEIT,
  LIST_WEATHER_STATES_ID
} from '../constants/weather'

/**
 * This function converts from kelvin to celsius or fahrenheit
 * @param   {number}  grades      Grades in kelvin.
 * @param   {string}  type        Type of temperature what it will be the response.
 * @return  {number}  Rounded result of the conversion.
 */

export const gradeConverterFromKelvin = (grades, type) => {
  let temperature 
  switch (type) {
    case WEATHER_TYPE_CELSIUS:
      temperature = grades - 273.15;
      break;
    case WEATHER_TYPE_FAHRENHEIT:
      temperature = grades * (9 / 5) + 32
      break
    default:
      temperature = grades
      break
  }
  return Math.round(temperature)
}

export const getGradeConversion = (grades, type) => {
  let temperature
  switch (type) {
    case WEATHER_TYPE_CELSIUS:
      temperature = grades
      break;
    case WEATHER_TYPE_FAHRENHEIT:
      temperature = grades * (9 / 5) + 32
      break
    default:
      temperature = grades
      break
  }
  return Math.round(temperature)
}
/**
 * This function give the abbreviation of the type of temperature
 * @param   {string}    type      [CELSIUS, FAHRENHEIT].
 * @return  {string}    Temperature abbreviation [Cº, Fº]
 */

export const gradeAbbreviation = (type) => {
  let abbr = ''
  switch (type) {
    case WEATHER_TYPE_CELSIUS:
      abbr = 'Cº'
      break
    case WEATHER_TYPE_FAHRENHEIT:
      abbr = 'Fº'
      break
    default:
      abbr = 'Cº'
      break
  }
  return abbr
}

/**
 * This function give the navigator.geolocation.getCurrentPosition
 * @param   {options}    Options to get the current position
 * @return  {promise}    Object with latitude and longitude
 */

export const getPosition = (options) => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

/**
 * This function give the icon class for selected state 
 * @param   {weatherState}    Weather state of API response
 * @return  {icon}     String with icon class for the @param state 
 */
export const getIcon = (state) => {
  let icon = 'weather-icon wi '
  switch (state) {
    case CLEAR_SKY:
      return icon += 'wi-day-sunny'
    case FEW_CLOUDS:
      return icon += 'wi-cloud'
    case SCATTERED_CLOUDS:
      return icon += 'wi-day-cloudy-high'
    case BROKEN_CLOUDS:
      return icon += 'wi-cloudy'
    case SHOWER_RAIN:
      return icon += 'wi-showers'
    case RAIN:
      return icon += 'wi-rain'
    case THUNDERSTORM:
      return icon += 'wi-thunderstorm'
    case SNOW:
      return icon += 'wi-snow'
    case MIST:
      return icon += 'wi-day-rain-mix'
    case HAZE:
      return icon += 'wi-day-haze'
    case FOG:
      return icon += 'wi-fog'
    default:
      return icon += 'wi-day-sunny'
  }
}
/**
 * This function give the icon class for selected state 
 * @param   {weatherStateId}    ID of Weather Conditions 
 * @description SEE for more info https://openweathermap.org/weather-conditions
 * @return  {icon}     String with icon class for the @param id 
 */
export const getIconById = (id) => { 
  const icon = 'weather-icon wi '
  if (id >= ID_THUNDERSTORM[0] && id <= ID_THUNDERSTORM[1]){
    return icon + 'wi-thunderstorm' 
  } else if (id >= ID_DRIZZLE[0] && id <= ID_DRIZZLE[1]) {
    return icon + 'wi-day-rain-mix'
  } else if (id >= ID_RAIN[0] && id <= ID_RAIN[1]) {
    return icon + 'wi-rain'
  } else if (id >= ID_SNOW[0] && id <= ID_SNOW[1]) {
    return icon + 'wi-snow'
  } else if (id >= ID_ATMOSPHERE[0] && id <= ID_ATMOSPHERE[1]) {
    return icon + 'wi-day-haze'
  } else if (id >= ID_CLEAR[0] && id <= ID_CLEAR[1]) {
    return icon + 'wi-day-sunny'
  } else if (id >= ID_CLOUDS[0] && id <= ID_CLOUDS[1]){
    return icon + 'wi-cloud'
  } else {
    return icon + 'wi-day-sunny'
  }
}

// YES! POR FIN ALGO SENCILLO Y EFICIENTE
export const getIconByIdMaped = (id, time) => {
  let date = new Date(time)
  const sunOrMoon = (date.getHours() > 18)? 'night' : 'day'
  return `weather-icon wi wi-owm-${sunOrMoon}-${id}`  
}

/**
 * @param   {actualDate}    Timestamp of actual date 
 * @description This function return the next five days given the @param date
 * @return  {Array}     Array with timestamps of the next five days 
 */

export const getNext5Days = (actualDate) => {
  let now = new Date(actualDate)
  now.setDate(now.getDate() + 1)
  const numberOfDays = 5
  let next5Days = new Array(numberOfDays).fill(now)

  return next5Days.map((day, i) => {
    const nextDay = day.getDate() + i
    const newDate = new Date(day).setDate(nextDay)
    return newDate
  })
}

export const getTimeFromUnixTimestamp = (unixTimestamp) => {
  return unixTimestamp * 1000
}

export const getDayOfTheWeek = (day) => {
  const week = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']
  return week[day]
}

export const getAbbreviateDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}`
}

export const getFormatedDate = (date) => {
  const formatedDate = new Date(date)
  const strDate = formatedDate.toString()
  return `${strDate.substring(3, 15).toUpperCase()} `
}

export const getDescriptionById = (id) => {
  const LIST_STATES = Object.keys(LIST_WEATHER_STATES_ID)
  let actualState = ""
  LIST_STATES.forEach((state)=>{
    if (id >= LIST_WEATHER_STATES_ID[state][0] && id <= LIST_WEATHER_STATES_ID[state][1]){
      actualState = state
    }
  })
  return actualState
}

export const getIconFlag = (country) => {
  const flag = country.split(",")[1].substring(1, 3).toLowerCase()
  return `icon-pin em em-flag-${flag} flag-pin`
}

export const getDateForSun = (date) => {
  const formatedDate = new Date(getTimeFromUnixTimestamp(date));
  const today = new Date();
  if(formatedDate.getDay() === today.getDay()){
    return `Hoy, ${(formatedDate.getHours() === 0) ? '00' : formatedDate.getHours()}:${formatedDate.getMinutes()}`;
  } else {
    return `Mañana, ${(formatedDate.getHours() === 0) ? '00' : formatedDate.getHours()}:${formatedDate.getMinutes()}`
  }
}

export const getNext5DaysForecastData = (data) => {
  return data.filter((forecast) => {
    const time = new Date(forecast.time)
    return time.getHours() === 22;
  })
}

export const getForecastbyDays = (forecastList) => {
  const formated = {}
  forecastList.forEach((forecast)=>{
    const forecastDayWeek = new Date(forecast.time)
    const day = getDayOfTheWeek(forecastDayWeek.getDay())
    if(formated.hasOwnProperty(day)){
      formated[day].push(forecast)
    } else {
      formated[day] = [forecast]
    }
  })
  return formated
}

export const getFormatedCity = (city)=>{
  return [city.split(',')[0], city.split(',')[1].substring(1)]
}