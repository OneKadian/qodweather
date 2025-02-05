import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const savedGeolocation = localStorage.getItem("savedGeolocation");
  return savedGeolocation
    ? JSON.parse(savedGeolocation)
    : { geolocation: { lat: 28.6139, lng: 77.209 } };
};

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: getInitialState(),
  reducers: {
    saveGeoCode: (state, action) => {
      state.geolocation = action.payload;
      localStorage.setItem("savedGeolocation", JSON.stringify(state));
    },
  },
});

export const { saveGeoCode } = geolocationSlice.actions;
export default geolocationSlice;
