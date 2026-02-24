import { createSlice } from "@reduxjs/toolkit";

interface mainSliceTypes {
  currentStep: number;
}

const initialState: mainSliceTypes = { currentStep: 1 };

const MainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setCurrentStep } = MainSlice.actions;
export default MainSlice.reducer;
