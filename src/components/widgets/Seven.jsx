import React, { useState, useEffect } from "react";
import ForecastingCard from "./ForecastingCard";
import { fetchWeatherData } from "../../api/weatherService";
import { useSelector } from "react-redux";

const SevenDay = () => {
  const [forecast, setForecast] = useState([]);
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [_, forecastData] = await fetchWeatherData(lat, lng);
        setForecast(
          forecastData.list
            .filter((_, index) => index % 8 === 1)
            .map((item) => ({
              day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              }),
              icon: item.weather[0].icon,
              id: item.weather[0].id,
              temp: Math.round(item.main.temp),
              tempMax: Math.round(item.main.temp_max),
              tempMin: Math.round(item.main.temp_min),
              description: item.weather[0].description,
            }))
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [lat, lng]);

  return (
    <div className="flex w-full flex-col gap-4 px-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:flex-row">
      {forecast.map((day, index) => (
        <ForecastingCard key={index} forecast={day} />
      ))}
    </div>
  );
};

export default SevenDay;
