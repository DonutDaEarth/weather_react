import React, {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useGetWeather from "./../hooks/useGetWeather";
import useCityStorage from "./../hooks/useCityStorage";


const MainScreen = (id) => {
  const { getStorage, setStorage } = useCityStorage();
  const {data: weatherData, getWeather} = useGetWeather();

  useEffect(() => {
    console.log("sent request for "+id.id)
    
    if(id.id !== undefined) {
      getWeather(id.id);
    }
    
  }, []);

  useEffect(() => {
    if(weatherData?.main) {
      if(weatherData.id == id.id) {
        console.log(`storage to ${weatherData.name}`);
        setStorage(weatherData);
      }
      
    }
  }, [weatherData])


  return (
    <div className='mainPage'>
      <Spinner animation="border" id="main-spinner"/>
      
      {/* {weatherData.main?  */}
      <div>
        <section className='mainBody'>
          <div className='bodyCell' id='bodyCity'>
            <p>{weatherData?.name?? "-"}</p>
          </div>
          <div className='bodyCell' id='bodyTemp'>
            <p>{weatherData?.main?.temp?.toFixed()?? "-"}<span>°C</span></p>
          </div>
          <div className='bodyCell' id='bodyCloud'>
            <p>{weatherData?.weather[0]?.main?? "-"}</p>
          </div>
        </section>
          
        <section className='footer'>
          <div className="footer-flex">
            <div className="footer-cell">
              <p>Feels Like</p>
              <h3>{weatherData?.main?.feels_like?.toFixed()?? "-"}°C</h3>
            </div>
            <div className="footer-cell">
              <p>Humidity</p>
              <h3>{weatherData?.main?.humidity?.toFixed()?? "-"}%</h3>
            </div>
            <div className="footer-cell">
              <p>Pressure</p>
              <h3>{weatherData?.main?.pressure?.toFixed()?? "-"} Pa</h3>
            </div>
            <div className="footer-cell">
              <p>Wind Speed</p>
              <h3>{weatherData?.wind?.speed?.toFixed()?? "-"} m/h</h3>
            </div>
          </div>
        </section> 
      </div>
    {/* : <Spinner animation="border" id="main-spinner"/>} */}
    </div>
  );
}

export default MainScreen;