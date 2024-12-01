import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectScore } from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';

export default function useScore(playerNumber: PlayerNumber) {
  const score = useSelector((state: RootState) =>
    selectScore(state, playerNumber)
  );

  return score;
}
