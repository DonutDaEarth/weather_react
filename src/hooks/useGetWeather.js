import axios from 'axios';
import { useCallback, useContext } from 'react';
import { GlobalContext } from "../context/globalContext"

const fetchCityWeather = (city) =>  {
    const apikey = `7400f50facb82737b4de9574174c6a0c`;
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apikey}&units=metric`;
    return axios.get(url);
    // axios.get(url).then((response) => {
    //     return response.data;
    // })
}

const useGetWeather = ()=> {
    const {state, updateState} = useContext(GlobalContext);
    const { weather: {data, isLoading = false} = {}} = state;
    const getWeather = useCallback(
        (city)=>{
            updateState({
                isLoading: true,
            });

            return fetchCityWeather(city)
            .then((res)=>{
                const { data } = res;

                updateState({
                    weather: {
                        data,
                        isLoading: false,
                    },
                });
            })
            .catch((error) => {
                updateState({
                    weather: {
                        error,
                        isLoading: false,
                    },
                });
            })
        }, [updateState]
    );
    return {
        data, 
        getWeather, 
        isLoading
    };
};

export default useGetWeather;