import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';
import { selectBeat } from '../app/slices/playersSlice';

export default function useBeat(playerNumber: PlayerNumber) {
  const beat = useSelector((state: RootState) =>
    selectBeat(state, playerNumber)
  );

  return beat;
}
