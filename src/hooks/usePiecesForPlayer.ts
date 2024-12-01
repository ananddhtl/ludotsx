import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectPiecesForPlayer } from '../app/slices/piecesSlice';
import { PlayerNumber } from '../types';

export default function usePiecesForPlayer(playerNumber: PlayerNumber) {
  const pieces = useSelector((state: RootState) =>
    selectPiecesForPlayer(state, playerNumber)
  );

  return pieces;
}
