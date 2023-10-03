import React from 'react';
import ShowCity from './widgets/ShowCity.js';

const SearchScreen = (cityData, onClick) => {
    return(
        <div className='searchPage'>
            <section className='searchBody'>
                    {cityData.RECORDS? ShowCity(cityData, (id) => onClick(id)) : null}
            </section>
        </div>
    );
}

export default SearchScreen;