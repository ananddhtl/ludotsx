import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  moveActiveToNextOne,
  setIsRolling,
  setIsSelecting,
  setMoveAgain,
  setScore,
} from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import { getRandomNumber, pause } from '../utils';
import { PAUSE_AFTER_MOVE_ROLL_TIME, ROLL_TIME } from '../constants';
import useMove from './useMove';
import useEvaluatePosition from './useEvaluatePosition';
import useScore from './useScore';
import { setRollOneMoreTime } from '../app/slices/piecesSlice';
import rollDiceSound from '../assets/dice-sound.mp3';
import usePlaySounds from './usePlaySounds';

export default function useRollDice(playerNumber: PlayerNumber) {
  const dispatch = useDispatch<AppDispatch>();
  const score = useScore(playerNumber);

  const evaluatePosition = useEvaluatePosition(playerNumber);

  useMove(playerNumber);

  const playSounds = usePlaySounds();

  const rollDice = useCallback(async () => {
    dispatch(setIsRolling([playerNumber, true]));
    await pause(PAUSE_AFTER_MOVE_ROLL_TIME);
    if (playSounds) {
      new Audio(rollDiceSound).play();
    }
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        dispatch(setIsRolling([playerNumber, false]));
        const newScore = getRandomNumber(1, 6);
        dispatch(setScore([playerNumber, newScore]));

        const arePossiblePositions = evaluatePosition(newScore);

        if (newScore === 6) {
          dispatch(setMoveAgain([playerNumber, true]));
        }

        if (arePossiblePositions) {
          dispatch(setIsSelecting([playerNumber, true]));
        } else if (!arePossiblePositions && newScore === 6) {
          dispatch(setMoveAgain([playerNumber, false]));
          dispatch(setRollOneMoreTime(true));
        } else if (!arePossiblePositions) {
          dispatch(moveActiveToNextOne(playerNumber));
        }
        resolve();
      }, ROLL_TIME);
    });
  }, [dispatch, playerNumber, evaluatePosition, playSounds]);

  return { score, rollDice };
}
