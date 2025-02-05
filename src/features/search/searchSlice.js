// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   searchValue: "",
//   location: "New Delhi, Delhi, India",
// };

// const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     updateSearchValue: (state, action) => {
//       return { ...state, searchValue: action.payload };
//     },
//     saveLocation: (state, action) => {
//       return { ...state, location: action.payload };
//     },
//   },
// });

// export const { updateSearchValue, clearnInputValue, saveLocation } =
//   searchSlice.actions;
// export default searchSlice;

import { createSlice } from "@reduxjs/toolkit";

// Helper function to get initial state from local storage
const getInitialState = () => {
  const savedSearch = localStorage.getItem("savedLocation");
  return savedSearch
    ? JSON.parse(savedSearch)
    : {
        searchValue: "",
        location: "New Delhi, Delhi, India",
      };
};

const searchSlice = createSlice({
  name: "search",
  initialState: getInitialState(),
  reducers: {
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    saveLocation: (state, action) => {
      state.location = action.payload;
      // Save to local storage
      localStorage.setItem("savedLocation", JSON.stringify(state));
    },
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
  },
});

export const { updateSearchValue, saveLocation, clearSearchValue } =
  searchSlice.actions;
export default searchSlice;
