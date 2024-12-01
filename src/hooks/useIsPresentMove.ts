import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { selectPiecesForPlayer } from '../app/slices/piecesSlice';
import { RootState } from '../app/store';
import { useCallback } from 'react';

export default function useIsPresentMove(playerNumber: PlayerNumber) {
  const pieces = useSelector((state: RootState) =>
    selectPiecesForPlayer(state, playerNumber)
  );
  const isPresent = useCallback(
    (score: number) => {
      if (score === 6) return true;

      return pieces.some((piece) => piece.possiblePosition !== null);
    },
    [pieces]
  );

  return isPresent;
}
