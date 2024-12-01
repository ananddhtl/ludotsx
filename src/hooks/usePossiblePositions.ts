import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectPossibleMoves } from '../app/slices/piecesSlice';
import { PlayerNumber } from '../types';

export default function usePossiblePositions(playerNumber: PlayerNumber) {
  const possiblePositions = useSelector((state: RootState) =>
    selectPossibleMoves(state, playerNumber)
  );

  return possiblePositions;
}
