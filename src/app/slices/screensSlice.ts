import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Screen } from '../../types';

export interface ScreensState {
  screen: Screen;
}

const initialState: ScreensState = {
  screen: Screen.STARTING,
};

export const screensSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<Screen>) => {
      state.screen = action.payload;
    },
    resetScreen: (state) => {
      state.screen = Screen.STARTING;
    },
  },
});

export const { setScreen, resetScreen } = screensSlice.actions;

export const selectScreen = (state: RootState) => state.screens.screen;

export default screensSlice.reducer;
