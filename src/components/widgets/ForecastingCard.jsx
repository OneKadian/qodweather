import React from "react";
import { useSelector } from "react-redux";
import WeatherIcon from "../common/WeatherIcon";

const ForecastingCard = ({ forecast }) => {
  const temperatureUnit = useSelector((state) => state.temperature.unit);

  const convertTemp = (temp) => {
    if (temperatureUnit === "F") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="rounded-3xl border border-gray-700 bg-white p-4 shadow-lg dark:bg-neutral-800">
      <div className="text-lg font-semibold">{forecast.day}</div>
      <WeatherIcon iconType={forecast.icon} id={forecast.id} size={36} />
      <div className="font-KardustBold text-4xl">
        {convertTemp(forecast.temp)}°{temperatureUnit}
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        {forecast.description}
      </div>
      <div className="mt-2 flex justify-between">
        <div className="flex flex-col items-center">
          <div className="font-KardustBold">
            {convertTemp(forecast.tempMax)}°{temperatureUnit}
          </div>
          <div className="text-gray-500 dark:text-gray-400">High</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-KardustBold">
            {convertTemp(forecast.tempMin)}°{temperatureUnit}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Low</div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingCard;
