import { useSelector } from 'react-redux';
import { selectScreen } from '../app/slices/screensSlice';

export default function useScreen() {
  const screen = useSelector(selectScreen);

  return screen;
}
