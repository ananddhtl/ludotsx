import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeSelectedPiece,
  resetPossiblePositions,
  selectSelectedPiece,
  setOutOfPlay,
  setPosition,
  setRollOneMoreTime,
} from '../app/slices/piecesSlice';
import { AppDispatch } from '../app/store';
import {
  moveActiveToNextOne,
  setBeat,
  setIsActive,
  setIsSelecting,
  setMoveAgain,
} from '../app/slices/playersSlice';
import { PlayerNumber, Screen } from '../types';
import useIsActivePlayer from './useIsActivePlayer';
import useIsPlayer from './useIsPlayer';
import usePossiblePositions from './usePossiblePositions';
import usePiecesForPlayer from './usePiecesForPlayer';
import useNumberOutOfPlay from './useNumberOutOfPlay';
import { setIsOver, setWinner } from '../app/slices/gameSettingsSlice';
import { setScreen } from '../app/slices/screensSlice';
import {
  PIECE_MOVE_TIME,
  STARTING_POSITIONS,
  STARTING_POSITIONS_PLAYER,
} from '../constants';
import usePiecesForPosition from './usePiecesForPosition';
import useScore from './useScore';
import { pause } from '../utils';
import useMoveAgain from './useMoveAgain';
import useRollOneMoreTime from './useRollOneMoreTime';
import useBeat from './useBeat';
import usePlaySounds from './usePlaySounds';

import swooshSound from '../assets/swoosh-sound.mp3';
import winSound from '../assets/win-sound.mp3';
import winningSound from '../assets/winning-sound.wav';
import loseSound from '../assets/lose-sound.wav';

export default function useMove(playerNumber: PlayerNumber) {
  const selectedPiece = useSelector(selectSelectedPiece);

  const dispatch = useDispatch<AppDispatch>();
  const isActive = useIsActivePlayer(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);
  const possiblePositions = usePossiblePositions(playerNumber);
  const piecesForPlayer = usePiecesForPlayer(playerNumber);
  const numberOutOfPlay = useNumberOutOfPlay(playerNumber);
  const score = useScore(playerNumber);

  const moveAgain = useMoveAgain(playerNumber);
  const rollOneMoreTime = useRollOneMoreTime();
  const beat = useBeat(playerNumber);

  const findPiecesForPosition = usePiecesForPosition();

  const playSounds = usePlaySounds();

  useEffect(() => {
    if (possiblePositions.every((position) => position === null)) {
      return;
    }

    if (!selectedPiece || !isActive || rollOneMoreTime) {
      return;
    }

    if (selectedPiece.playerNumber !== playerNumber) return;

    let moved = false;

    piecesForPlayer.forEach((piece) => {
      if (piece.pieceNumber === selectedPiece.pieceNumber) {
        if (piece.possiblePosition !== null) {
          const piecesForPosition = findPiecesForPosition(
            piece.possiblePosition
          );
          const playersPiecesCount = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
          };

          piecesForPosition.forEach((piece) => {
            playersPiecesCount[piece.playerNumber] += 1;
          });

          piecesForPosition.forEach((piece) => {
            if (
              piece.playerNumber !== playerNumber &&
              playersPiecesCount[piece.playerNumber] < 2
            ) {
              dispatch(setBeat([playerNumber, true]));
            }
          });

          piecesForPosition.forEach(async (piece) => {
            if (
              piece.playerNumber !== playerNumber &&
              playersPiecesCount[piece.playerNumber] < 2
            ) {
              if (
                !STARTING_POSITIONS.find(
                  (position) =>
                    position.x === piece.position?.x &&
                    position.y === piece.position.y
                )
              ) {
                await pause(score! * PIECE_MOVE_TIME);
              }
              if (playSounds) {
                new Audio(swooshSound).play();
              }
              dispatch(
                setPosition([piece.playerNumber, piece.pieceNumber, null])
              );
            }
          });

          dispatch(
            setPosition([
              piece.playerNumber,
              piece.pieceNumber,
              piece.possiblePosition,
            ])
          );
          const starting = STARTING_POSITIONS.find(
            (position) =>
              position.x === piece.position?.x &&
              position.y === piece.position?.y
          );
          if (
            piece.position &&
            !(starting && STARTING_POSITIONS_PLAYER[playerNumber] == starting)
          ) {
            moved = true;
          }

          if (
            piece.possiblePosition.x > 5 &&
            piece.possiblePosition.x < 9 &&
            piece.possiblePosition.y > 5 &&
            piece.possiblePosition.y < 9
          ) {
            if (playSounds) {
              new Audio(winSound).play();
            }
            dispatch(setOutOfPlay([piece.playerNumber, piece.pieceNumber]));
            if (numberOutOfPlay === 3) {
              dispatch(setIsOver(true));
              dispatch(setScreen(Screen.GAME_OVER));
              if (isPlayer) {
                if (playSounds) {
                  new Audio(winningSound).play();
                }
                dispatch(setWinner('player'));
              } else {
                if (playSounds) {
                  new Audio(loseSound).play();
                }
                dispatch(setWinner('bot'));
              }
            }
          }
        }
      }
    });

    dispatch(removeSelectedPiece());
    dispatch(resetPossiblePositions());

    if (!moved) {
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
  }, [
    selectedPiece,
    dispatch,
    playerNumber,
    isActive,
    isPlayer,
    possiblePositions,
    piecesForPlayer,
    numberOutOfPlay,
    findPiecesForPosition,
    score,
    moveAgain,
    rollOneMoreTime,
    beat,
    playSounds,
  ]);
}
