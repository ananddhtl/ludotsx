import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { resetBoard } from '../app/slices/boardSlice';
import { resetGameSettings } from '../app/slices/gameSettingsSlice';
import { resetPieces } from '../app/slices/piecesSlice';
import { resetPlayers } from '../app/slices/playersSlice';
import { resetScreen } from '../app/slices/screensSlice';

export default function useRestart() {
  const dispatch = useDispatch<AppDispatch>();

  const restart = useCallback(() => {
    dispatch(resetBoard());
    dispatch(resetGameSettings());
    dispatch(resetPieces());
    dispatch(resetPlayers());
    dispatch(resetScreen());
  }, [dispatch]);

  return restart;
}
