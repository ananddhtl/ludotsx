import { useCallback } from 'react';
import { PlayerNumber } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setPossiblePosition } from '../app/slices/piecesSlice';
import useIsActivePlayer from './useIsActivePlayer';
import usePiecesForPlayer from './usePiecesForPlayer';
import findNextPosition from '../utils/findNextPosition';
import { isValidPosition } from '../utils';

export default function useEvaluatePosition(playerNumber: PlayerNumber) {
  const pieces = usePiecesForPlayer(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);

  const dispatch = useDispatch<AppDispatch>();

  const evaluatePosition = useCallback(
    (newScore: number) => {
      if (!isActive) return;

      if (pieces.every((piece) => piece.position === null) && newScore < 6) {
        return;
      }

      let arePossiblePositions = false;

      pieces.forEach((piece) => {
        if (piece.outOfPlay) return;
        const addPossiblePosition = () => {
          if (piece.position && !isValidPosition(piece.position)) {
            return;
          }
          const newPosition = findNextPosition(
            piece.position!,
            newScore,
            playerNumber
          );

          dispatch(
            setPossiblePosition([playerNumber, piece.pieceNumber, newPosition])
          );
        };

        if (newScore === 6 && piece.position === null) {
          switch (playerNumber) {
            case '1': {
              dispatch(
                setPossiblePosition(['1', piece.pieceNumber, { y: 6, x: 1 }])
              );
              arePossiblePositions = true;
              break;
            }
            case '2': {
              dispatch(
                setPossiblePosition(['2', piece.pieceNumber, { y: 1, x: 8 }])
              );
              arePossiblePositions = true;
              break;
            }
            case '3': {
              dispatch(
                setPossiblePosition(['3', piece.pieceNumber, { y: 8, x: 13 }])
              );
              arePossiblePositions = true;
              break;
            }
            case '4': {
              dispatch(
                setPossiblePosition(['4', piece.pieceNumber, { y: 13, x: 6 }])
              );
              arePossiblePositions = true;
              break;
            }
          }
          return;
        } else if (piece.position === null) {
          return;
        } else if (piece.position.x === 7 || piece.position.y === 7) {
          switch (playerNumber) {
            case '1': {
              if (piece.position.y === 7 && piece.position.x < 6) {
                if (newScore <= 6 - piece.position.x) {
                  arePossiblePositions = true;
                  addPossiblePosition();
                } else {
                  return;
                }
              }
              break;
            }
            case '2': {
              if (piece.position.x === 7 && piece.position.y < 6) {
                if (newScore <= 6 - piece.position.y) {
                  arePossiblePositions = true;
                  addPossiblePosition();
                } else {
                  return;
                }
              }
              break;
            }
            case '3': {
              if (piece.position.y === 7 && piece.position.x > 8) {
                if (newScore <= piece.position.x - 8) {
                  arePossiblePositions = true;
                  addPossiblePosition();
                } else {
                  return;
                }
              }
              break;
            }
            case '4': {
              if (piece.position.x === 7 && piece.position.y > 8) {
                if (newScore <= piece.position.y - 8) {
                  arePossiblePositions = true;
                  addPossiblePosition();
                } else {
                  return;
                }
              }
              break;
            }
          }
        }

        addPossiblePosition();
        arePossiblePositions = true;
      });
      return arePossiblePositions;
    },
    [pieces, playerNumber, dispatch, isActive]
  );

  return evaluatePosition;
}
