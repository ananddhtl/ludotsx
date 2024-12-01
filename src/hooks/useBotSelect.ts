import { useEffect } from 'react';
import { PieceNumber, PlayerNumber, Position } from '../types';
import useIsPlayer from './useIsPlayer';
import useIsSelecting from './useIsSelecting';
import usePossiblePositions from './usePossiblePositions';
import { getRandomNumber } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectPieces,
  setRollOneMoreTime,
  setSelectedPiece,
} from '../app/slices/piecesSlice';
import useIsActivePlayer from './useIsActivePlayer';
import {
  moveActiveToNextOne,
  setBeat,
  setIsActive,
  setIsSelecting,
  setMoveAgain,
} from '../app/slices/playersSlice';
import useMoveAgain from './useMoveAgain';
import useRollOneMoreTime from './useRollOneMoreTime';
import useBeat from './useBeat';
import { selectDifficulty } from '../app/slices/gameSettingsSlice';
import giveBestOption from '../utils/giveBestOption';

export default function useBotSelect(playerNumber: PlayerNumber) {
  const isPlayer = useIsPlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);

  const rollOneMoreTime = useRollOneMoreTime();

  const possiblePositions = usePossiblePositions(playerNumber);
  const moveAgain = useMoveAgain(playerNumber);
  const beat = useBeat(playerNumber);

  const difficultyLevel = useSelector(selectDifficulty);
  const pieces = useSelector(selectPieces);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isPlayer || !isSelecting || !isActive || rollOneMoreTime) return;

    if (isSelecting) {
      const positionsPlayer = possiblePositions
        .map((pos, idx) => {
          return {
            position: pos,
            pieceNumber: (idx + 1).toString(),
          };
        })
        .filter((entry) => entry.position !== null);
      if (positionsPlayer.length !== 0) {
        let entryIdx: number;

        switch (difficultyLevel) {
          case 'easy': {
            const rand = getRandomNumber(0, positionsPlayer.length - 1);
            entryIdx = rand;
            break;
          }
          case 'normal': {
            entryIdx = giveBestOption(
              pieces,
              positionsPlayer as {
                position: Position;
                pieceNumber: PieceNumber;
              }[],
              playerNumber,
              'normal'
            );
            break;
          }
          case 'difficult': {
            entryIdx = giveBestOption(
              pieces,
              positionsPlayer as {
                position: Position;
                pieceNumber: PieceNumber;
              }[],
              playerNumber,
              'difficult'
            );
            break;
          }
        }

        const entry = positionsPlayer[entryIdx!];
        dispatch(
          setSelectedPiece([playerNumber, entry.pieceNumber as PieceNumber])
        );
      } else {
        if (moveAgain) {
          dispatch(setIsActive([playerNumber, true]));
          dispatch(setIsSelecting([playerNumber, false]));
          dispatch(setMoveAgain([playerNumber, false]));
          dispatch(setRollOneMoreTime(true));
        } else if (beat) {
          dispatch(setIsActive([playerNumber, true]));
          dispatch(setIsSelecting([playerNumber, false]));
          dispatch(setBeat([playerNumber, false]));
          dispatch(setRollOneMoreTime(true));
        } else {
          dispatch(moveActiveToNextOne(playerNumber));
        }
      }
    }
  }, [
    isPlayer,
    isSelecting,
    possiblePositions,
    dispatch,
    playerNumber,
    isActive,
    moveAgain,
    rollOneMoreTime,
    beat,
    difficultyLevel,
    pieces,
  ]);
}
