import React from 'react'
import PropType from 'prop-types'
import './style.css'

const LocationTitle = (props) => {
    const { city, pinClass, selectedIndicator } = props
    return (
        <div> 
            <h1 className={`weather-title-primary`}>
                <i className={`${pinClass}`}></i>
                  {city}
                {
                    (selectedIndicator)?
                    <span className="arrow-right"></span>
                    :
                    ""
                } 
                
            </h1>
            
        </div>
    )
}

LocationTitle.propTypes = {
    city: PropType.string.isRequired,
}

export default LocationTitle