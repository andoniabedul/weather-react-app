const BASE_API_URL = "http://ip-api.com/json/"

export const getIpLocation = () => {
  return new Promise((resolve, reject)=>{
    fetch(BASE_API_URL)
      .then( response => response.json())
      .then( coords => resolve(coords))
      .catch( error => reject(error))
  })
}

