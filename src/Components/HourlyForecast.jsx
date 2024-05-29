
import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import defaultIcon from "../assets/icons/defaultIcon.png";

const HourlyForecast = ({ hourlyData }) => {
  const [filteredHourlyData, setFilteredHourlyData] = useState([]);

  useEffect(() => {
    if (hourlyData && hourlyData.length > 0) {
      const currentHour = new Date().getHours();
      const next5HoursData = [];

      // Iterate over hourlyData to find the next 5 hours including the current hour
      for (let i = 0; i < hourlyData.length; i++) {
        const itemHour = new Date(hourlyData[i].datetime).getHours();
        
        if (itemHour >= currentHour && next5HoursData.length < 5) {
          next5HoursData.push(hourlyData[i]);
        }
      }

      setFilteredHourlyData(next5HoursData);
    }
  }, [hourlyData]);

  const getWeatherIcon = (iconString) => {
    console.log('iconString:', iconString);
    
    if (iconString) {
      const lowerCaseIconString = iconString.toLowerCase();
      console.log('lowerCaseIconString:', lowerCaseIconString);
  
      if (lowerCaseIconString.includes('cloud')) {
        return cloud;
      } else if (lowerCaseIconString.includes('rain')) {
        return rain;
      } else if (lowerCaseIconString.includes('thunder')) {
        return storm;
      } else if (lowerCaseIconString.includes('fog')) {
        return fog;
      } else if (lowerCaseIconString.includes('snow')) {
        return snow;
      } else if (lowerCaseIconString.includes('wind')) {
        return wind;
      } else if (lowerCaseIconString.includes('clear')) {
        return sun;
      }
    }
    return defaultIcon;
  };
  
  return (
    <div>
      <h2 className='font-bold text-2xl'>Hourly Forecast</h2>
      <div className="hourly-forecast-container flex justify-center gap-8 flex-wrap w-full">
        {filteredHourlyData.map((hourlyItem) => (
          <div key={hourlyItem.datetime} className="hourlyCard w-[10rem] h-[10rem] p-4 flex flex-col">
            <p className="text-center">{new Date(hourlyItem.datetime).toLocaleTimeString('en', { hour: 'numeric' })}</p>
            <hr />
            <div className="w-full flex justify-center items-center flex-2">
              {getWeatherIcon(hourlyItem.conditions) ? (
                <img src={getWeatherIcon(hourlyItem.conditions)} alt="weather" className="w-[4rem] h-[4rem]" />
              ) : (
                <span>No Icon</span> // Display fallback if icon is not found
              )}
            </div>
            <p className="text-center font-bold">{hourlyItem.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default HourlyForecast;
