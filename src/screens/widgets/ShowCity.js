import React from 'react';
import CityCell from './CityCell.js';

const ShowCity = (data, onClick) => {
    
    return(
        <div className="showCity">
            {data.RECORDS ? data.RECORDS.map(
                (item) => {
                    return CityCell(item, (id) => onClick(id));
                }
            ) : null}
        </div>
    );
}
export default ShowCity;