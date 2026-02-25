import { createSlice } from "@reduxjs/toolkit";

interface mainSliceTypes {
  currentStep: number;
  walletAddress: null | string;
}

const initialState: mainSliceTypes = {
  currentStep: 0,
  walletAddress: null,
};

const MainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
});

export const { setCurrentStep, setWalletAddress } = MainSlice.actions;
export default MainSlice.reducer;
