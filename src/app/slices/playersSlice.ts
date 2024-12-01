import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Player, PlayerNumber } from '../../types';
import { RootState } from '../store';

export interface PlayersState {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
}

const defaultState = {
  player1: {
    isPlaying: false,
    isBot: true,
    isRolling: false,
    isActive: false,
    isSelecting: false,
    score: null,
    moveAgain: false,
    beat: false,
  },
  player2: {
    isPlaying: false,
    isBot: true,
    isRolling: false,
    isActive: false,
    isSelecting: false,
    score: null,
    moveAgain: false,
    beat: false,
  },
  player3: {
    isPlaying: false,
    isBot: true,
    isRolling: false,
    isActive: false,
    isSelecting: false,
    score: null,
    moveAgain: false,
    beat: false,
  },
  player4: {
    isPlaying: false,
    isBot: true,
    isRolling: false,
    isActive: false,
    isSelecting: false,
    score: null,
    moveAgain: false,
    beat: false,
  },
};

const initialState: PlayersState = defaultState;

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setIsPlayingPlayer: (
      state,
      action: PayloadAction<{ number: PlayerNumber; active: boolean }[]>
    ) => {
      action.payload.forEach((player) => {
        state[`player${player.number}`].isPlaying = player.active;
      });
    },
    resetPlayers: () => defaultState,
    setIsNotBot: (state, action: PayloadAction<PlayerNumber>) => {
      state[`player${action.payload}`].isBot = false;
    },
    setIsRolling: (state, action: PayloadAction<[PlayerNumber, boolean]>) => {
      state.player1.isRolling = false;
      state.player2.isRolling = false;
      state.player3.isRolling = false;
      state.player4.isRolling = false;

      state[`player${action.payload[0]}`].isRolling = action.payload[1];
    },

    setIsActive: (state, action: PayloadAction<[PlayerNumber, boolean]>) => {
      state.player1.isActive = false;
      state.player2.isActive = false;
      state.player3.isActive = false;
      state.player4.isActive = false;

      state[`player${action.payload[0]}`].isActive = action.payload[1];
    },

    setIsSelecting: (state, action: PayloadAction<[PlayerNumber, boolean]>) => {
      state.player1.isSelecting = false;
      state.player2.isSelecting = false;
      state.player3.isSelecting = false;
      state.player4.isSelecting = false;

      state[`player${action.payload[0]}`].isSelecting = action.payload[1];
    },

    setScore: (state, action: PayloadAction<[PlayerNumber, number | null]>) => {
      state.player1.isSelecting = false;
      state.player2.isSelecting = false;
      state.player3.isSelecting = false;
      state.player4.isSelecting = false;

      state[`player${action.payload[0]}`].score = action.payload[1];
    },

    setMoveAgain: (state, action: PayloadAction<[PlayerNumber, boolean]>) => {
      state.player1.moveAgain = false;
      state.player2.moveAgain = false;
      state.player3.moveAgain = false;
      state.player4.moveAgain = false;

      state[`player${action.payload[0]}`].moveAgain = action.payload[1];
    },

    setBeat: (state, action: PayloadAction<[PlayerNumber, boolean]>) => {
      state.player1.beat = false;
      state.player2.beat = false;
      state.player3.beat = false;
      state.player4.beat = false;

      state[`player${action.payload[0]}`].beat = action.payload[1];
    },

    moveActiveToNextOne: (state, action: PayloadAction<PlayerNumber>) => {
      state.player1.isActive = false;
      state.player2.isActive = false;
      state.player3.isActive = false;
      state.player4.isActive = false;

      let nextOne: PlayerNumber;
      let currentPlayer = +action.payload;

      do {
        nextOne = (1 + (currentPlayer % 4)).toString() as PlayerNumber;
        currentPlayer += 1;
      } while (!state[`player${nextOne}`].isPlaying);

      state[`player${nextOne}`].isActive = true;
    },
  },
});

export const {
  setIsPlayingPlayer,
  resetPlayers,
  setIsNotBot,
  setIsRolling,
  setIsActive,
  setIsSelecting,
  setScore,
  moveActiveToNextOne,
  setMoveAgain,
  setBeat,
} = playersSlice.actions;

export const selectPlayers = (state: RootState) => state.players;
export const selectIsPlaying = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isPlaying;
  }
);
export const selectIsBot = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isBot;
  }
);
export const selectIsRolling = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isRolling;
  }
);
export const selectIsActive = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isActive;
  }
);
export const selectIsSelecting = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isSelecting;
  }
);
export const selectScore = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].score;
  }
);
export const selectMoveAgain = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].moveAgain;
  }
);
export const selectBeat = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].beat;
  }
);

export default playersSlice.reducer;
