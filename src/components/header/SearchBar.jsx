// import React, { useState, useEffect } from "react";
// import { Combobox } from "@headlessui/react";
// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   saveLocation,
//   updateSearchValue,
// } from "../../features/search/searchSlice";
// import { saveGeoCode } from "../../features/geolocation/geolocationSlice";
// import { fetchWeatherData } from "../../api/weatherService"; // You'll need to create this

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function SearchBar({ onWeatherFetch }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       types: ["(cities)"],
//     },
//     debounce: 300,
//   });

//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleInput = (event) => {
//     setValue(event.target.value);
//     setIsOpen(event.target.value.length > 0);
//   };

//   const handleChange = async (selectedValue) => {
//     setValue(selectedValue, false);
//     clearSuggestions();
//     setIsOpen(false);

//     try {
//       const results = await getGeocode({ address: selectedValue });
//       const { lat, lng } = getLatLng(results[0]);

//       // Dispatch location and geocode
//       dispatch(updateSearchValue(selectedValue));
//       dispatch(saveLocation(selectedValue));
//       dispatch(saveGeoCode({ lat, lng }));

//       // Fetch weather data
//       const [weatherData, forecastData] = await fetchWeatherData(lat, lng);
//       onWeatherFetch(weatherData, forecastData);
//     } catch (error) {
//       console.error("Error fetching location or weather data:", error);
//     }
//   };

//   const handleBlur = () => {
//     // Small delay to allow option click before closing
//     setTimeout(() => {
//       setIsOpen(false);
//       clearSuggestions();
//     }, 200);
//   };

//   return (
//     <div className="w-full max-w-lg">
//       <Combobox
//         as="div"
//         onChange={handleChange}
//         value={value}
//         nullable
//         className="relative"
//       >
//         <div className="relative">
//           <MagnifyingGlassIcon
//             className="pointer-events-none absolute top-3.5 left-5 h-6 w-6 text-gray-900 text-opacity-40 dark:text-gray-400"
//             aria-hidden="true"
//           />
//           <Combobox.Input
//             type="text"
//             autoComplete="off"
//             onChange={handleInput}
//             onBlur={handleBlur}
//             placeholder="Search city..."
//             className="w-full rounded-2xl bg-neutral-50 py-3.5 pl-14 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-gray-100 dark:placeholder-gray-400 sm:text-sm"
//             disabled={!ready}
//           />
//         </div>

//         {isOpen && status === "OK" && data.length > 0 && (
//           <Combobox.Options
//             static
//             className="absolute z-10 mt-1 max-h-72 w-full max-w-lg origin-top overflow-auto rounded-2xl bg-white py-1 text-sm text-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 dark:text-gray-200"
//           >
//             {data.map(({ place_id, description }) => (
//               <Combobox.Option
//                 key={place_id}
//                 value={description}
//                 className={({ active }) =>
//                   classNames(
//                     "cursor-default select-none px-4 py-2",
//                     active
//                       ? "bg-neutral-200 dark:bg-neutral-700"
//                       : "bg-white dark:bg-neutral-800"
//                   )
//                 }
//               >
//                 {({ active }) => (
//                   <div
//                     className={classNames(
//                       "block truncate",
//                       active ? "font-medium" : "font-normal"
//                     )}
//                   >
//                     {description}
//                   </div>
//                 )}
//               </Combobox.Option>
//             ))}
//           </Combobox.Options>
//         )}
//       </Combobox>
//     </div>
//   );
// }

// export default SearchBar;

import React, { useState, useEffect, useCallback } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  saveLocation,
  updateSearchValue,
} from "../../features/search/searchSlice";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";
import { fetchWeatherData } from "../../api/weatherService";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SearchBar({ onWeatherFetch }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
    },
    debounce: 300,
  });

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const UPDATE_INTERVAL = 30000; // 30 seconds
  // const geoCode = useSelector((state) => state.geolocation);
  const geoCode = useSelector((state) => state.geolocation.geolocation);

  // Function to fetch weather with error handling and notifications
  // const fetchWeatherWithNotification = useCallback(async () => {
  //   if (!geoCode.lat || !geoCode.lng) return; // Don't fetch if we don't have coordinates

  //   try {
  //     const [weatherData, forecastData] = await fetchWeatherData(
  //       geoCode.lat,
  //       geoCode.lng
  //     );
  //     onWeatherFetch(weatherData, forecastData);
  //     toast.success("Weather updated successfully");
  //   } catch (error) {
  //     let errorMessage = "Could not update weather";
  //     if (error.message === "Failed to fetch") {
  //       errorMessage = "Network error - please check your connection";
  //     } else if (error.response?.status === 429) {
  //       errorMessage = "Too many requests - please try again later";
  //     }
  //     toast.error(errorMessage);
  //     console.error("Error updating weather:", error);
  //   }
  // }, [geoCode.lat, geoCode.lng, onWeatherFetch]);

  const fetchWeatherWithNotification = useCallback(async () => {
    if (!geoCode.lat || !geoCode.lng) {
      console.log("No coordinates available");
      return;
    }

    // Check if enough time has passed since last update
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime < UPDATE_INTERVAL) {
      return;
    }

    try {
      console.log("Fetching weather for:", geoCode);
      const [weatherData, forecastData] = await fetchWeatherData(
        geoCode.lat,
        geoCode.lng
      );
      onWeatherFetch(weatherData, forecastData);
      toast.success("Weather updated successfully");
      setLastUpdateTime(currentTime);
    } catch (error) {
      let errorMessage = "Could not update weather";
      if (error.message.includes("Network error")) {
        errorMessage = error.message;
      } else if (error.message.includes("429")) {
        errorMessage = "Too many requests - please try again later";
      }
      toast.error(errorMessage);
      console.error("Error updating weather:", error);
    }
  }, [geoCode, onWeatherFetch, lastUpdateTime]);

  // Set up auto-refresh interval
  useEffect(() => {
    if (!geoCode.lat || !geoCode.lng) return;

    // Initial fetch only if no recent update
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime >= UPDATE_INTERVAL) {
      fetchWeatherWithNotification();
    }

    // Set up interval
    const intervalId = setInterval(
      fetchWeatherWithNotification,
      UPDATE_INTERVAL
    );

    // Cleanup interval on unmount or when location changes
    return () => {
      clearInterval(intervalId);
    };
  }, [geoCode.lat, geoCode.lng]); // Remove fetchWeatherWithNotification from dependencies

  const handleInput = (event) => {
    setValue(event.target.value);
    setIsOpen(event.target.value.length > 0);
  };

  const handleChange = async (selectedValue) => {
    setValue(selectedValue, false);
    clearSuggestions();
    setIsOpen(false);

    try {
      const results = await getGeocode({ address: selectedValue });
      const { lat, lng } = getLatLng(results[0]);

      // Dispatch location and geocode
      dispatch(updateSearchValue(selectedValue));
      dispatch(saveLocation(selectedValue));
      dispatch(saveGeoCode({ lat, lng }));

      // Initial weather fetch for new location
      const [weatherData, forecastData] = await fetchWeatherData(lat, lng);
      onWeatherFetch(weatherData, forecastData);
      toast.success("Location updated successfully");
    } catch (error) {
      toast.error("Error fetching location data");
      console.error("Error fetching location or weather data:", error);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      clearSuggestions();
    }, 200);
  };

  return (
    <div className="w-full max-w-lg">
      <Combobox
        as="div"
        onChange={handleChange}
        value={value}
        nullable
        className="relative"
      >
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-3.5 left-5 h-6 w-6 text-gray-900 text-opacity-40 dark:text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            type="text"
            autoComplete="off"
            onChange={handleInput}
            onBlur={handleBlur}
            placeholder="Search city..."
            className="w-full rounded-2xl bg-neutral-50 py-3.5 pl-14 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-gray-100 dark:placeholder-gray-400 sm:text-sm"
            disabled={!ready}
          />
        </div>

        {isOpen && status === "OK" && data.length > 0 && (
          <Combobox.Options
            static
            className="absolute z-10 mt-1 max-h-72 w-full max-w-lg origin-top overflow-auto rounded-2xl bg-white py-1 text-sm text-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 dark:text-gray-200"
          >
            {data.map(({ place_id, description }) => (
              <Combobox.Option
                key={place_id}
                value={description}
                className={({ active }) =>
                  classNames(
                    "cursor-default select-none px-4 py-2",
                    active
                      ? "bg-neutral-200 dark:bg-neutral-700"
                      : "bg-white dark:bg-neutral-800"
                  )
                }
              >
                {({ active }) => (
                  <div
                    className={classNames(
                      "block truncate",
                      active ? "font-medium" : "font-normal"
                    )}
                  >
                    {description}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
}

export default SearchBar;
