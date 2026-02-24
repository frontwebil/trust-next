import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./Slice/MainSlice";

export const store = configureStore({
  reducer: {
    main: MainSlice,
  },
});

// Типы для TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
