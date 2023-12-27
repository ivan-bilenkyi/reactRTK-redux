import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    actionFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { actionFilter } = filterSlice.actions;

export default filterSlice.reducer;

//Selectors

export const selectFilter = (state) => state.filter.filter;
