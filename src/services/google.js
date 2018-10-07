const BASE_API_URL = "https://maps.googleapis.com/maps/api/"
const GEOCODE_SERVICE = "geocode"
const GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APPID

const getUrlGeocodeByCoordinates = (latitude, longitude) => `${BASE_API_URL}${GEOCODE_SERVICE}/json?latlng=${latitude},${longitude}&key=${GOOGLE_APP_ID}`


export const getCitiesByCoordinates = (latitude, longitude) => {
  const URL = getUrlGeocodeByCoordinates(latitude, longitude)
  return new Promise((resolve, reject)=>{
    fetch(URL)
    .then((response)=> response.json())
    .then((cities)=> {
      if(isNotError(cities)){
        const formatedCities = cities.results[0]['address_components'].filter((addresses) => {
          return addresses.types.includes('political')
        })
        resolve(formatedCities)
      } else {
        reject({
          error: 'Parece que ocurre un error consultando el servidor. Intente más tarde. Google.'
        })
      }
    })
    .catch((error)=> reject(error))  
  })
}

const isNotError = (response) => {return (response.status === "OK")? true : false}


const Google = {
  getCitiesByCoordinates,
}

export default Google