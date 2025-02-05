

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import OtherCities from "./components/widgets/OtherCities";
import WeatherMap from "./components/widgets/WeatherMap";
import { Toaster } from "react-hot-toast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleWeatherUpdate = (weatherData, forecastData) => {
    setCurrentWeather(weatherData);
    setForecast(forecastData);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto px-6 md:px-0">
        <Header onWeatherUpdate={handleWeatherUpdate} />
        <Outlet context={{ currentWeather, forecast }} />
        <div className="pb-10">
          <div className="mt-10 flex flex-col gap-4 px-6 md:flex-row md:px-0">
            <WeatherMap />
            <div className="mt-4 md:mt-0 md:mr-6">
              <OtherCities />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
