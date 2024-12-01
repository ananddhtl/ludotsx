import { useSelector } from 'react-redux';
import { selectPlaySounds } from '../app/slices/gameSettingsSlice';

export default function usePlaySounds() {
  const playSounds = useSelector(selectPlaySounds);

  return playSounds;
}
