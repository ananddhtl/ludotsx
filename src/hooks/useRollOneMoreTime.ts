import { useSelector } from 'react-redux';
import { selectRollOneMoreTime } from '../app/slices/piecesSlice';

export default function useRollOneMoreTime() {
  const rollOneMoreTime = useSelector(selectRollOneMoreTime);

  return rollOneMoreTime;
}
