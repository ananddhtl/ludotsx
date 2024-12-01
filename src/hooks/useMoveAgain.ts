import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';
import { selectMoveAgain } from '../app/slices/playersSlice';

export default function useMoveAgain(playerNumber: PlayerNumber) {
  const moveAgain = useSelector((state: RootState) =>
    selectMoveAgain(state, playerNumber)
  );

  return moveAgain;
}
