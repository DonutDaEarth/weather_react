import React from 'react';

const CityCell = (city, onClick) => {
    return (
        <div className='cityCell' key={city.owm_city_id} onClick={() => onClick(city.owm_city_id)} id='normalCell'>
            <h1>{city.owm_city_name}</h1>
            <p>{city.country_long}</p>
        </div>
    )
}

export default CityCell;