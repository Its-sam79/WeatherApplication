import React, { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, MiniCard, WeatherCard } from './Components';
import HourlyForecast from './Components/HourlyForecast';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, place, setPlace, dailyForecast, hourlyForecast } = useStateContext();

  useEffect(() => {
    console.log('Daily Forecast:', dailyForecast);
    console.log('Hourly Forecast:', hourlyForecast);
  }, [dailyForecast, hourlyForecast]);

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className="w-full h-screen text-black px-4 md:px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-2xl md:text-3xl">WForecast</h1>
        <div className="bg-white w-[10rem] md:w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder="search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className="w-full flex flex-col md:flex-row gap-6 py-4 px-4 md:px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatIndex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className="flex justify-center gap-4 md:gap-8 flex-wrap w-full md:w-[60%]">
          {dailyForecast?.slice(1, 7).map((curr) => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
      <div className="flex justify-center gap-4 flex-wrap w-full">
        <HourlyForecast hourlyData={hourlyForecast} />
      </div>
    </div>
  );
}

export default App;