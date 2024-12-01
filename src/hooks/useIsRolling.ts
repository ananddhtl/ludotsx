import { useSelector } from 'react-redux';
import { selectIsRolling } from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';

export default function useIsRolling(playerNumber: PlayerNumber) {
  const isRolling = useSelector((state: RootState) =>
    selectIsRolling(state, playerNumber)
  );

  return isRolling;
}
