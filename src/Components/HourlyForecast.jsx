import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import defaultIcon from '../assets/icons/defaultIcon.png';

const HourlyForecast = ({ hourlyData }) => {
  const [filteredHourlyData, setFilteredHourlyData] = useState([]);

  useEffect(() => {
    if (hourlyData && hourlyData.length > 0) {
      const currentTime = new Date();

      // Convert datetimeStr to Date objects and filter for the next 5 hours
      const next5HoursData = hourlyData
        .map(item => ({
          ...item,
          datetime: new Date(item.datetimeStr)
        }))
        .filter(item => item.datetime > currentTime)
        .sort((a, b) => a.datetime - b.datetime)
        .slice(0, 5);

      setFilteredHourlyData(next5HoursData);
    }
  }, [hourlyData]);

  // Setting hourly Card icon according to weather state 
  const getWeatherIcon = (iconString) => {
    if (iconString) {
      const lowerCaseIconString = iconString.toLowerCase();
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
    return defaultIcon; // Default icon if no match found
  };

  return (
    <div>
    <h2 className="text-2xl font-bold mb-4 text-center">Hourly Forecast</h2>
      <div className="hourly-forecast-container flex justify-center gap-8 flex-wrap w-full">
        {filteredHourlyData.map((hourlyItem) => (
          <div key={hourlyItem.datetime} className="hourlyCard w-[10rem] h-[10rem] p-4 flex flex-col">
            <p className="text-center">{hourlyItem.datetime.toLocaleTimeString('en', { hour: 'numeric', hour12: true })}</p>
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
