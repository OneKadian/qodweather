import { useSelector } from "react-redux";
import WeatherIcon from "../common/WeatherIcon";

function City({ city, country, data }) {
  const temperatureUnit = useSelector((state) => state.temperature.unit);

  const convertTemp = (temp) => {
    if (temperatureUnit === "F") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      {data && (
        <div className="flex w-full transform justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-md hover:scale-105 hover:transition dark:bg-neutral-800 md:w-[22rem]">
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <div>
              <div>{country}</div>
              <div className="text-xl font-bold">{city}</div>
            </div>
            <div className="text-md font-medium">
              {capitalizeFirstLetter(data.weather[0].description)}
            </div>
          </div>
          {/* RIGHT */}
          <div className="flex flex-col items-center justify-between overflow-hidden">
            <div className="-mt-2 h-24 w-24">
              <WeatherIcon
                iconType={data.weather[0].icon}
                id={data.weather[0].id}
                size={24}
              />
            </div>
            <div className="text-lg font-semibold">
              {convertTemp(data.main.temp)}&deg;{temperatureUnit}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default City;
