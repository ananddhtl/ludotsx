import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Color, Difficulty, NumberOfPlayers } from '../../types';

export interface GameSettingsState {
  numberOfPlayers: NumberOfPlayers | null;
  playerColor: Color | null;
  difficulty: Difficulty | null;
  isOver: boolean;
  winner: 'player' | 'bot' | null;
  playSounds: boolean;
}

const initialState: GameSettingsState = {
  numberOfPlayers: null,
  playerColor: null,
  difficulty: null,
  isOver: false,
  winner: null,
  playSounds: false,
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setNumberOfPlayers: (state, action: PayloadAction<NumberOfPlayers>) => {
      state.numberOfPlayers = action.payload;
    },
    setPlayerColor: (state, action: PayloadAction<Color>) => {
      state.playerColor = action.payload;
    },
    setIsOver: (state, action: PayloadAction<boolean>) => {
      state.isOver = action.payload;
    },
    setWinner: (state, action: PayloadAction<'player' | 'bot' | null>) => {
      state.winner = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    setPlaySounds: (state, action: PayloadAction<boolean>) => {
      state.playSounds = action.payload;
    },
    resetGameSettings: (state) => {
      state.isOver = false;
      state.numberOfPlayers = null;
      state.playerColor = null;
      state.winner = null;
      state.difficulty = null;
    },
  },
});

export const {
  setNumberOfPlayers,
  setPlayerColor,
  setIsOver,
  setWinner,
  setDifficulty,
  resetGameSettings,
  setPlaySounds,
} = gameSettingsSlice.actions;

export const selectNumberOfPlayers = (state: RootState) =>
  state.gameSettings.numberOfPlayers;

export const selectPlayerColor = (state: RootState) =>
  state.gameSettings.playerColor;

export const selectGameSettings = (state: RootState) => state.gameSettings;

export const selectIsGameOver = (state: RootState) => state.gameSettings.isOver;

export const selectDifficulty = (state: RootState) =>
  state.gameSettings.difficulty;

export const selectWinner = (state: RootState) => state.gameSettings.winner;

export const selectPlaySounds = (state: RootState) =>
  state.gameSettings.playSounds;

export default gameSettingsSlice.reducer;
