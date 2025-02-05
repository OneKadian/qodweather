// import { createSlice } from "@reduxjs/toolkit";

// const temperatureSlice = createSlice({
//   name: "temperature",
//   initialState: {
//     unit: "C", // default to Celsius
//   },
//   reducers: {
//     toggleTemperatureUnit: (state) => {
//       state.unit = state.unit === "C" ? "F" : "C";
//     },
//   },
// });

// export const { toggleTemperatureUnit } = temperatureSlice.actions;
// export default temperatureSlice;

import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const savedTemperatureUnit = localStorage.getItem("temperatureUnit");
  return {
    unit: savedTemperatureUnit || "C",
  };
};

const temperatureSlice = createSlice({
  name: "temperature",
  initialState: getInitialState(),
  reducers: {
    toggleTemperatureUnit: (state) => {
      state.unit = state.unit === "C" ? "F" : "C";
      localStorage.setItem("temperatureUnit", state.unit);
    },
  },
});

export const { toggleTemperatureUnit } = temperatureSlice.actions;
export default temperatureSlice;
