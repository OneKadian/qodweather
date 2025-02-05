import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/search/searchSlice";
import geolocationSlice from "../features/geolocation/geolocationSlice";
import { weatherApi } from "../services/WeatherApi";
import darkModeSlice from "../features/theme/themeSlice";
import temperatureSlice from "../features/temperature/temperatureSlice"; // Add this import

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    geolocation: geolocationSlice.reducer,
    darkMode: darkModeSlice.reducer,
    temperature: temperatureSlice.reducer, // Add this line
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
