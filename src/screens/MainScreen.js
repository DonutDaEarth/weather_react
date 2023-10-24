import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


const MainScreen = (id) => {
  const [data,setData] = useState({});
  const cityID = '1642911';
  const url = 'https://api.openweathermap.org/data/2.5/weather?id='+id.id+'&appid=8a7e197037009d7a5c570e8387da3825&units=metric';
  
  const findCity = () => {
    axios.get(url).then((response) => {
        setData(response.data);
        console.log(data);
      })
  };

  useEffect(() => {
    if(!data.name) {
      findCity();
    }
  });


  return (
    <div className='mainPage'>
      <Spinner animation="border" id="main-spinner"/>
      {data.main? <div>
      <section className='mainBody'>
        <div className='bodyCell' id='bodyCity'>
          <p>{data.name}</p>
        </div>
        <div className='bodyCell' id='bodyTemp'>
          {data.main? <p>{data.main.temp.toFixed()}<span>°C</span></p>  : null}
        </div>
        <div className='bodyCell' id='bodyCloud'>
          <p>{data.weather? data.weather[0].main : null}</p>
        </div>
      </section>
        
      <section className='footer'>
        <div className="footer-flex">
          <div className="footer-cell">
            <p>Feels Like</p>
            {data.main? <h3>{data.main.feels_like.toFixed()}°C</h3>  : null}
          </div>
          <div className="footer-cell">
            <p>Humidity</p>
            {data.main? <h3>{data.main.humidity.toFixed()}%</h3>  : null}
          </div>
          <div className="footer-cell">
            <p>Pressure</p>
            {data.main? <h3>{data.main.pressure.toFixed()} Pa</h3>  : null}
          </div>
          <div className="footer-cell">
            <p>Wind Speed</p>
            {data.main? <h3>{data.wind.speed.toFixed()} m/h</h3>  : null}
          </div>
        </div>
      </section> </div>
    : <Spinner animation="border" id="main-spinner"/>}
    </div>
  );
}

export default MainScreen;