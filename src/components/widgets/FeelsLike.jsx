import { useSelector } from "react-redux";
import { WiThermometer } from "react-icons/wi";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

function FeelsLike() {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const temperatureUnit = useSelector((state) => state.temperature.unit);

  const convertTemp = (temp) => {
    if (temperatureUnit === "F") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function dataProcessor(temp, feels_like) {
    let result;
    switch (true) {
      case temp > feels_like:
        result = "Wind is making it feel colder.";
        break;
      case temp === feels_like:
        result = "Similar to the actual temperature.";
        break;
      default:
        result = "Invalid temperature value";
        break;
    }
    return result;
  }

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <WiThermometer className="h-5 w-5" />
            <div className="text-xs font-semibold">FEELS LIKE</div>
          </div>
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">
              {/* {Math.round(data.main.feels_like)}&deg; */}
              {Math.round(convertTemp(data.main.feels_like))}&deg;
              {temperatureUnit}
            </div>
          </div>
          <div className="text-xs">
            {dataProcessor(
              Math.round(data.main.temp),
              Math.round(data.main.feels_like)
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FeelsLike;
