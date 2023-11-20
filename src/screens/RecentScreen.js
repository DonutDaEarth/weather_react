import React from 'react';
import ShowRecent from './widgets/ShowRecent.js';

const recentScreen = (cityData, onClick, clearStorage) => {
    return(
        <div className='searchPage'>
            <section className='searchBody'>
                    {ShowRecent(cityData, (id) => onClick(id))}
                    <div className="showCity" id='clearRecent'>
                        <div className='cityCell' onClick={() => clearStorage()}>
                            <h1>CLEAR HISTORY</h1>
                        </div>
                    </div>
            </section>
        </div>
    );
}

export default recentScreen;