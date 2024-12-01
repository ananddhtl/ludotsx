import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';
import { selectIsMoving } from '../app/slices/piecesSlice';

export default function useIsMoving(playerNumber: PlayerNumber) {
  const isMovingPieces = useSelector((state: RootState) =>
    selectIsMoving(state, playerNumber)
  );

  return isMovingPieces;
}
