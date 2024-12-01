import { useSelector } from 'react-redux';
import { selectIsActive } from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';

export default function useIsActivePlayer(playerNumber: PlayerNumber) {
  const isActive = useSelector((state: RootState) =>
    selectIsActive(state, playerNumber)
  );

  return isActive;
}
