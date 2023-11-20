import React from 'react';

const RecentCell = (city, onClick) => {
    return (
        <div className='cityCell' key={city.owm_city_id} onClick={() => onClick(city.id)} id='normalCell'>
            <h1>{city.name}</h1>
        </div>
    )
}

export default RecentCell;