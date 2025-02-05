import { Link } from "react-router-dom";
import Location from "./Location";
import SearchBar from "./SearchBar";
import ThemeSwitchToggle from "./ThemeSwitchToggle";
import TemperatureUnitToggle from "./TemperatureUnitToggle";

function Header({ onWeatherUpdate }) {
  return (
    <>
      <nav className="my-4 flex items-center justify-between gap-4 pr-6">
        <div className="invisible md:visible">
          <Location />
        </div>
        <SearchBar onWeatherFetch={onWeatherUpdate} />
        <div className="flex items-center gap-4">
          <ThemeSwitchToggle />
          <TemperatureUnitToggle />
        </div>
      </nav>
      <div className="flex gap-2 py-4 px-6 text-lg font-semibold sm:px-0">
        <Link to="/weather-app-vite/">
          <button className="rounded-lg py-2 px-4 hover:bg-neutral-200 hover:dark:bg-neutral-800">
            Today
          </button>
        </Link>
        <Link to="forecast">
          <button className="rounded-lg py-2 px-4 hover:bg-neutral-200 hover:dark:bg-neutral-800">
            Forecast
          </button>
        </Link>
      </div>
    </>
  );
}

export default Header;
