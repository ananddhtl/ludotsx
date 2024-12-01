import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';
import { selectNumberOutOfPlay } from '../app/slices/piecesSlice';

export default function useNumberOutOfPlay(playerNumber: PlayerNumber) {
  const numberOutOfPlay = useSelector((state: RootState) =>
    selectNumberOutOfPlay(state, playerNumber)
  );

  return numberOutOfPlay;
}
