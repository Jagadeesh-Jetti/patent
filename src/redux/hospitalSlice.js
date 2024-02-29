import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPatients: 0,
  occupancyRate: 0,
  averageStay: 0,
  topPerformingWard: 0,
};

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    updateState: (state, action) => {
      const { totalPatients, occupancyRate, averageStay, topPerformingWard } =
        action.payload;

      state.averageStay = averageStay;
      state.totalPatients = totalPatients;
      state.occupancyRate = occupancyRate;
      state.topPerformingWard = topPerformingWard;
    },
    setTopPerformingWard: (state, action) => {
      state.topPerformingWard = action.payload;
    },
  },
});

export const { updateState, setTopPerformingWard } = hospitalSlice.actions;
export default hospitalSlice.reducer;
