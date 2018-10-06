const BASE_API_URL = "https://ipapi.co/json/"

export const getIpLocation = () => {
  return new Promise((resolve, reject)=>{
    fetch(BASE_API_URL)
      .then( response => response.json())
      .then( coords => resolve(coords))
      .catch( error => reject(error))
  })
}

