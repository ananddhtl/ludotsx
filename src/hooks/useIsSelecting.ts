import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { selectIsSelecting } from '../app/slices/playersSlice';
import { RootState } from '../app/store';

export default function useIsSelecting(playerNumber: PlayerNumber) {
  const isSelecting = useSelector((state: RootState) =>
    selectIsSelecting(state, playerNumber)
  );

  return isSelecting;
}
