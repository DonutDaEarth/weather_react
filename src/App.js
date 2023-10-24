import React, {useEffect,useState} from 'react';
import axios from 'axios';
import MainScreen from './screens/MainScreen';
import SearchScreen from './screens/SearchScreen';

const App = () => {
  const maxSize = 500;
  const [city,setCity] = useState("");
  const [data,setData] = useState({});
  const url = "https://raw.githubusercontent.com/manifestinteractive/openweathermap-cities/master/data/owm_city_list.json";
  const [cityData,setCityData] = useState({});
  const [cityID, setCityID] = useState("1642911");
  const [currPage, setCurrPage] = useState(<MainScreen id={cityID}/>);//SearchScreen(cityData));
  

  const handleClick = (id) => {
    setCity("");
    setCityID(id);
    setCurrPage(<MainScreen id={id}/>);
  }


  const findCity = () => {
    axios.get(url).then((response) => {
        setData(response.data); 
    })
  }

  useEffect(() => {
    if(!data.RECORDS) {
      console.log("finding cities");
      findCity();
    }
  } , [data.RECORDS])


  const searchCity = (search, data) => {
    
    let cityResults = [];
    setCity(search);
    console.log(search);

    data.RECORDS.sort(
        (a,b) => {
          return a.owm_city_name.localeCompare(b.owm_city_name)
        }
    )

    for(let i=0;i<data.RECORDS.length;i++) {
        if(
          (data.RECORDS[i].owm_city_name.toLowerCase().includes(search.toLowerCase()) || 
          data.RECORDS[i].country_long.toLowerCase().includes(search.toLowerCase())) &&
          data.RECORDS[i].owm_city_name !== ""
        ) {
            cityResults.push(data.RECORDS[i]);
            if(cityResults.length>=maxSize) break;
        }
    }
    let tempCityData = cityData;
    tempCityData.RECORDS = cityResults;
    setCityData(tempCityData);
    
    console.log(cityData);
    if(search === "") {
      setCurrPage(<MainScreen id={cityID}/>);
    } else {
      setCurrPage(SearchScreen(cityData, (id) => handleClick(id)));//, (id) => this.handleClick(id)));
    }
    
    //console.log(cityData);
  }

  


  return(
    <div>
      <section className='searchBar'>
        <div>
          <input 
            type='text' 
            placeholder='Enter Location...'
            onKeyDown={findCity}
            value={city}
            onChange={event => data.RECORDS? searchCity(event.target.value, data) : setCity(event.target.value)}
          />
          {/* <div className='searchDel' onClick={() => data.RECORDS? searchCity("", data) : setCity("")}>
            X
          </div> */}
        </div>
      </section>
      
      {currPage}
    </div>

  ); 
}

export default App;