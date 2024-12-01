import { MutableRefObject, useEffect, useMemo } from 'react';
import { PieceNumber, PlayerNumber } from '../types';
import usePiecesForPlayer from './usePiecesForPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  removeIsMoving,
  setIsMoving,
  setPreviousPosition,
  setRollOneMoreTime,
} from '../app/slices/piecesSlice';
import { selectWidth } from '../app/slices/boardSlice';
import getPath from '../utils/getPath';
import { getCoordinates, pause } from '../utils';
import { PIECE_MOVE_TIME } from '../constants';
import {
  moveActiveToNextOne,
  setBeat,
  setIsActive,
  setIsSelecting,
  setMoveAgain,
} from '../app/slices/playersSlice';
import calculateSpawnPosition from '../utils/calculateSpawnPosition';
import useMoveAgain from './useMoveAgain';
import useRollOneMoreTime from './useRollOneMoreTime';
import useBeat from './useBeat';
import usePlaySounds from './usePlaySounds';

import moveSound from '../assets/move-sound.mp3';

export default function useDisplace(
  playerNumber: PlayerNumber,
  refs: React.MutableRefObject<HTMLDivElement | null>[]
) {
  const piecesForPlayer = usePiecesForPlayer(playerNumber);
  const positions = useMemo(() => {
    return piecesForPlayer.map((piece) => piece.position);
  }, [piecesForPlayer]);
  const previousPositions = useMemo(() => {
    return piecesForPlayer.map((piece) => piece.previousPosition);
  }, [piecesForPlayer]);
  const arePiecesMoving = useMemo(() => {
    return piecesForPlayer.map((piece) => piece.isMoving);
  }, [piecesForPlayer]);
  const [firstRef, secondRef, thirdRef, fourthRef] = refs;

  const moveAgain = useMoveAgain(playerNumber);
  const rollOneMoreTime = useRollOneMoreTime();
  const beat = useBeat(playerNumber);

  const dispatch = useDispatch<AppDispatch>();
  const width = useSelector(selectWidth);

  const playSounds = usePlaySounds();

  useEffect(() => {
    if (
      firstRef.current === null ||
      secondRef.current === null ||
      thirdRef.current === null ||
      fourthRef.current === null ||
      width === null
    ) {
      return;
    }

    if (rollOneMoreTime) return;

    positions.forEach(async (position, positionIdx) => {
      if (!position && !previousPositions[positionIdx]) return;
      if (!position && previousPositions[positionIdx]) {
        const { bottom, left } = calculateSpawnPosition(
          playerNumber,
          (positionIdx + 1).toString() as PieceNumber,
          width
        );
        switch (positionIdx + 1) {
          case 1: {
            firstRef.current!.style.bottom = `${bottom}px`;
            firstRef.current!.style.left = `${left}px`;
            break;
          }
          case 2: {
            secondRef.current!.style.bottom = `${bottom}px`;
            secondRef.current!.style.left = `${left}px`;
            break;
          }
          case 3: {
            thirdRef.current!.style.bottom = `${bottom}px`;
            thirdRef.current!.style.left = `${left}px`;
            break;
          }
          case 4: {
            fourthRef.current!.style.bottom = `${bottom}px`;
            fourthRef.current!.style.left = `${left}px`;
            break;
          }
        }
        return;
      }

      if (position === null) return;

      const move = async (ref: MutableRefObject<HTMLDivElement | null>) => {
        if (arePiecesMoving[positionIdx]) return;

        if (previousPositions[positionIdx] === null) {
          const [bottom, left] = getCoordinates(width, position);
          ref.current!.style.bottom = `${bottom}px`;
          ref.current!.style.left = `${left}px`;
          return;
        }
        const path = getPath(
          previousPositions[positionIdx]!,
          position,
          playerNumber
        );

        if (path.length > 0) {
          dispatch(
            setIsMoving([
              playerNumber,
              (positionIdx + 1).toString() as PieceNumber,
            ])
          );
          dispatch(setIsActive([playerNumber, false]));
        }
        for (const coordinate of path) {
          const [bottom, left] = getCoordinates(width, coordinate);
          ref.current!.style.bottom = `${bottom}px`;
          ref.current!.style.left = `${left}px`;
          if (playSounds) {
            new Audio(moveSound).play();
          }
          await pause(PIECE_MOVE_TIME);
        }
        if (path.length > 0) {
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
      };

      switch (positionIdx + 1) {
        case 1: {
          await move(firstRef);
          break;
        }
        case 2: {
          await move(secondRef);
          break;
        }
        case 3: {
          await move(thirdRef);
          break;
        }
        case 4: {
          await move(fourthRef);
          break;
        }
      }

      if (
        position.x !== previousPositions[positionIdx]?.x ||
        position.y !== previousPositions[positionIdx]?.y
      ) {
        dispatch(
          setPreviousPosition([
            playerNumber,
            (positionIdx + 1).toString() as PlayerNumber,
            position,
          ])
        );
        dispatch(removeIsMoving());
      }
    });
  }, [
    firstRef,
    secondRef,
    thirdRef,
    fourthRef,
    positions,
    previousPositions,
    playerNumber,
    dispatch,
    width,
    arePiecesMoving,
    moveAgain,
    rollOneMoreTime,
    beat,
    playSounds,
  ]);
}
