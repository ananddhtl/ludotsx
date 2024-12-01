import { useSelector } from 'react-redux';
import { PlayerNumber } from '../types';
import { selectIsPlaying } from '../app/slices/playersSlice';
import { RootState } from '../app/store';

export default function useIsPlayingPlayer(playerNumber: PlayerNumber) {
  const isActive = useSelector((state: RootState) =>
    selectIsPlaying(state, playerNumber)
  );

  return isActive;
}
