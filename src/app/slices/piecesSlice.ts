import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Piece, PieceNumber, PlayerNumber, Position } from '../../types';

interface boardState {
  pieces: Piece[];
  selectedPieceIndex: number | null;
  rollOneMoreTime: boolean;
}
const initialState: boardState = {
  pieces: [],
  selectedPieceIndex: null,
  rollOneMoreTime: false,
};

export const boardSlice = createSlice({
  name: 'pieces',
  initialState,
  reducers: {
    addPiecesForPlayer: (state, action: PayloadAction<PlayerNumber>) => {
      state.pieces.push({
        pieceNumber: '1',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
        isMoving: false,
      });
      state.pieces.push({
        pieceNumber: '2',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
        isMoving: false,
      });
      state.pieces.push({
        pieceNumber: '3',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
        isMoving: false,
      });
      state.pieces.push({
        pieceNumber: '4',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
        isMoving: false,
      });
    },
    setSelectedPiece: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber]>
    ) => {
      const index = state.pieces.findIndex((piece) => {
        return (
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
        );
      });
      state.selectedPieceIndex = index;
    },
    removeSelectedPiece: (state) => {
      state.selectedPieceIndex = null;
    },
    setPossiblePosition: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber, Position | null]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) piece.possiblePosition = action.payload[2];
    },
    resetPossiblePositions: (state) => {
      state.pieces.forEach((piece) => {
        piece.possiblePosition = null;
      });
    },
    setPosition: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber, Position | null]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.previousPosition = piece.position;
        piece.position = action.payload[2];
      }
    },
    setPreviousPosition: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber, Position | null]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.previousPosition = action.payload[2];
      }
    },
    setOutOfPlay: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.outOfPlay = true;
      }
    },
    setIsMoving: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.isMoving = true;
      }
    },
    removeIsMoving: (state) => {
      state.pieces.forEach((piece) => {
        piece.isMoving = false;
      });
    },
    resetPieces: (state) => {
      state.pieces = [];
      state.selectedPieceIndex = null;
      state.rollOneMoreTime = false;
    },
    setRollOneMoreTime: (state, action: PayloadAction<boolean>) => {
      state.rollOneMoreTime = action.payload;
    },
  },
});

export const {
  addPiecesForPlayer,
  setSelectedPiece,
  removeSelectedPiece,
  setPossiblePosition,
  resetPossiblePositions,
  setPosition,
  setPreviousPosition,
  setOutOfPlay,
  setIsMoving,
  setRollOneMoreTime,
  removeIsMoving,
  resetPieces,
} = boardSlice.actions;

export const selectPieces = createSelector(
  (state: RootState) => state.pieces,
  (pieces) => pieces.pieces
);
export const selectRollOneMoreTime = createSelector(
  (state: RootState) => state.pieces,
  (pieces) => pieces.rollOneMoreTime
);
export const selectPiecesForPlayer = createSelector(
  [selectPieces, (_: RootState, playerNumber: PlayerNumber) => playerNumber],
  (pieces, playerNumber) =>
    pieces.filter((piece) => piece.playerNumber === playerNumber)
);

export const selectSelectedPiece = (state: RootState) => {
  return state.pieces.selectedPieceIndex !== null
    ? state.pieces.pieces[state.pieces.selectedPieceIndex]
    : null;
};

export const selectPossibleMoves = createSelector(
  [selectPiecesForPlayer],
  (pieces) => pieces.map((piece) => piece.possiblePosition)
);
export const selectIsMoving = createSelector(
  [selectPiecesForPlayer],
  (pieces) => pieces.map((piece) => piece.isMoving)
);

export const selectNumberOutOfPlay = createSelector(
  [selectPiecesForPlayer],
  (pieces) =>
    pieces.map((piece) => piece.outOfPlay).filter((outOfPlay) => outOfPlay)
      .length
);

export default boardSlice.reducer;
