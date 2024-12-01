import { useSelector } from 'react-redux';
import { selectIsBot } from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import { RootState } from '../app/store';

export default function useIsPlayer(playerNumber: PlayerNumber) {
  const isBot = useSelector((state: RootState) =>
    selectIsBot(state, playerNumber)
  );

  return !isBot;
}
