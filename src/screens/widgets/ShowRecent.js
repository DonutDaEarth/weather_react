import React from 'react';
import RecentCell from './RecentCell.js';

const ShowRecent = (data, onClick) => {
    
    return(
        <div className="showCity">
            {data.map(
                (item) => {
                    return RecentCell(item, (id) => onClick(id));
                }
            )}
        </div>
    );
}
export default ShowRecent;