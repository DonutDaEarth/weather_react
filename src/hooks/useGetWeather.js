import axios from 'axios';
import { useCallback, useContext } from 'react';
import { GlobalContext } from "../context/globalContext"

const fetchCityWeather = (city) =>  {
    const apikey = `8a7e197037009d7a5c570e8387da3825`;
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apikey}&units=metric`;
 
    axios.get(url).then((response) => {
        return response.data;
      })
}

const useGetWeather = ()=> {
    const {state, updateState} = useContext(GlobalContext);
    const { weather: {data, isLoading = false} = {}} = state;
    const getWeather = useCallback((city)=>{
        updateState({
            ...updateState,
            isLoading: true,
        });

        return fetchCityWeather(city).then((res)=>{
            const { result } = res;
            updateState({
                weather: {
                    ...state.weather,
                    data: result, isLoading: false,
                },
            });
        }).catch((error) => {
            console.log('Error', error);
        })
    }, [updateState]);
    return {data, getWeather, isLoading};
};

export default useGetWeather;