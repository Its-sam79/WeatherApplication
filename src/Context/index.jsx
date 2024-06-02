import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [place, setPlace] = useState('Delhi');
  const [thisLocation, setLocation] = useState('');

  const fetchWeather = async () => {
    const dailyOptions = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24', // Fetch daily (24-hour aggregate) data
        location: place,
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: 0
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    const hourlyOptions = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '1', // Fetch hourly data
        location: place,
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: 0
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      // Fetch daily forecast data
      const dailyResponse = await axios.request(dailyOptions);
      const dailyData = Object.values(dailyResponse.data.locations)[0];
      setLocation(dailyData.address);
      setDailyForecast(dailyData.values); // Set daily forecast data

      // Fetch hourly forecast data
      const hourlyResponse = await axios.request(hourlyOptions);
      const hourlyData = Object.values(hourlyResponse.data.locations)[0];
      setHourlyForecast(hourlyData.values); // Set hourly forecast data

      // Set current weather to the first item in daily forecast
      setWeather(dailyData.values[0]);
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Error fetching weather. Please try again later.');
      // Handle error
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        dailyForecast,
        hourlyForecast,
        setPlace,
        thisLocation,
        place
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
