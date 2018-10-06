const nearbyPlaces = 'GetNearbyCities';

const BASE_API_URL = 'http://gd.geobytes.com/'

const getUrlNearbyPlaces = (latitude, longitude) => `${BASE_API_URL}${nearbyPlaces}?latitude=${latitude}&longitude=${longitude}`

export const getNearbyPlaces = (latitude, longitude) => {
  const URL = getUrlNearbyPlaces(latitude, longitude)
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const cities = response.map((city)=>{
          return [
            city[1],
            city[6]
          ]
        })
        resolve(cities)
      })
      .catch((error) => console.log(error))
  })
}
const Geonames = {
  getNearbyPlaces
}

export default Geonames