import { useEffect, useMemo } from 'react';
import usePiecesForPlayer from './usePiecesForPlayer';
import { PieceNumber, PlayerNumber, Position } from '../types';
import { isAlreadyPositioned, pause } from '../utils';
import { PIECE_MOVE_TIME, STARTING_POSITIONS } from '../constants';
import useScore from './useScore';
import { useSelector } from 'react-redux';
import { selectIsGameOver } from '../app/slices/gameSettingsSlice';
import { selectWidth } from '../app/slices/boardSlice';
import useIsMoving from './useIsMoving';

interface OverLap {
  position: Position;
  pieceNumbers: PieceNumber[];
}

export default function usePieceOverlapping(
  playerNumber: PlayerNumber,
  refs: React.MutableRefObject<HTMLDivElement | null>[]
) {
  const piecesForPlayer = usePiecesForPlayer(playerNumber);
  const positionsPieces = useMemo(() => {
    return piecesForPlayer.map((piece) => ({
      position: piece.position,
      piece: piece.pieceNumber,
    }));
  }, [piecesForPlayer]);
  const score = useScore(playerNumber);
  const isGameOver = useSelector(selectIsGameOver);
  const isMoving = useIsMoving(playerNumber);

  const width = useSelector(selectWidth);

  const [firstRef, secondRef, thirdRef, fourthRef] = refs;
  useEffect(() => {
    if (
      firstRef.current === null ||
      secondRef.current === null ||
      thirdRef.current === null ||
      fourthRef.current === null ||
      isGameOver
    ) {
      return;
    }

    const getRef = (pieceNumber: PieceNumber) => {
      switch (pieceNumber) {
        case '1': {
          return firstRef;
        }
        case '2': {
          return secondRef;
        }
        case '3': {
          return thirdRef;
        }
        case '4': {
          return fourthRef;
        }
      }
    };

    ['1', '2', '3', '4'].forEach((pieceNumber, idx) => {
      if (isMoving[idx]) {
        getRef(pieceNumber as PieceNumber).current!.style.transform =
          'scale(1) translateX(0)';
      }
    });

    const overlaps: OverLap[] = [];
    positionsPieces.forEach((entry) => {
      if (entry.position === null) return;

      for (const item of positionsPieces) {
        if (item.position === null) continue;

        if (
          item.piece !== entry.piece &&
          entry.position.x === item.position.x &&
          entry.position.y === item.position.y
        ) {
          const existingOverlap = overlaps.find(
            (overlap) =>
              overlap.position.x === item.position!.x &&
              overlap.position.y === item.position!.y
          );
          if (!existingOverlap) {
            overlaps.push({
              position: item.position!,
              pieceNumbers: [item.piece],
            });
          } else {
            const pieceIncluded = existingOverlap.pieceNumbers.find(
              (number) => number === item.piece
            );
            if (!pieceIncluded) {
              existingOverlap.pieceNumbers.push(item.piece);
            }
          }
        }
      }
    });
    if (overlaps.length > 0) {
      overlaps.forEach(async (overlap) => {
        switch (overlap.pieceNumbers.length) {
          case 2: {
            const [firstPieceNumber, secondPieceNumber] = overlap.pieceNumbers;

            if (
              !STARTING_POSITIONS.find(
                (position) =>
                  position.x === overlap.position.x &&
                  position.y === overlap.position.y
              )
            ) {
              await pause(PIECE_MOVE_TIME * score!);
            }
            if (
              getRef(firstPieceNumber).current !== null &&
              getRef(secondPieceNumber).current !== null
            ) {
              if (
                isAlreadyPositioned(
                  getRef(firstPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === firstPieceNumber
                  )!.position!,
                  width!
                ) &&
                isAlreadyPositioned(
                  getRef(secondPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === secondPieceNumber
                  )!.position!,
                  width!
                )
              ) {
                getRef(firstPieceNumber).current!.style.transform =
                  'scale(0.95) translateX(-12px)';
                getRef(secondPieceNumber).current!.style.transform =
                  'scale(0.95) translateX(12px)';
              }
            }
            break;
          }
          case 3: {
            const [firstPieceNumber, secondPieceNumber, thirdPieceNumber] =
              overlap.pieceNumbers;

            if (
              !STARTING_POSITIONS.find(
                (position) =>
                  position.x === overlap.position.x &&
                  position.y === overlap.position.y
              )
            ) {
              await pause(PIECE_MOVE_TIME * score!);
            }

            if (
              getRef(firstPieceNumber).current !== null &&
              getRef(secondPieceNumber).current !== null &&
              getRef(thirdPieceNumber).current !== null
            ) {
              if (
                isAlreadyPositioned(
                  getRef(firstPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === firstPieceNumber
                  )!.position!,
                  width!
                ) &&
                isAlreadyPositioned(
                  getRef(secondPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === secondPieceNumber
                  )!.position!,
                  width!
                ) &&
                isAlreadyPositioned(
                  getRef(thirdPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === thirdPieceNumber
                  )!.position!,
                  width!
                )
              ) {
                getRef(firstPieceNumber).current!.style.transform =
                  'scale(0.9) translateX(-15px)';
                getRef(secondPieceNumber).current!.style.transform =
                  'scale(0.9) translateX(0)';
                getRef(thirdPieceNumber).current!.style.transform =
                  'scale(0.9) translateX(15px)';
              }
            }
            break;
          }
          case 4: {
            const [
              firstPieceNumber,
              secondPieceNumber,
              thirdPieceNumber,
              fourthPieceNumber,
            ] = overlap.pieceNumbers;

            if (
              !STARTING_POSITIONS.find(
                (position) =>
                  position.x === overlap.position.x &&
                  position.y === overlap.position.y
              )
            ) {
              await pause(PIECE_MOVE_TIME * score!);
            }
            if (
              getRef(firstPieceNumber).current !== null &&
              getRef(secondPieceNumber).current !== null &&
              getRef(thirdPieceNumber).current !== null &&
              getRef(fourthPieceNumber).current !== null
            ) {
              if (
                isAlreadyPositioned(
                  getRef(firstPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === firstPieceNumber
                  )!.position!,
                  width!
                ) &&
                isAlreadyPositioned(
                  getRef(secondPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === secondPieceNumber
                  )!.position!,
                  width!
                ) &&
                isAlreadyPositioned(
                  getRef(thirdPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === thirdPieceNumber
                  )!.position!,
                  width!
                ) &&
                isAlreadyPositioned(
                  getRef(fourthPieceNumber).current!,
                  positionsPieces.find(
                    (entry) => entry.piece === fourthPieceNumber
                  )!.position!,
                  width!
                )
              ) {
                getRef(firstPieceNumber).current!.style.transform =
                  'scale(0.85) translateX(-17px)';
                getRef(secondPieceNumber).current!.style.transform =
                  'scale(0.85) translateX(-5px)';
                getRef(thirdPieceNumber).current!.style.transform =
                  'scale(0.85) translateX(5px)';
                getRef(fourthPieceNumber).current!.style.transform =
                  'scale(0.85) translateX(17px)';
              }
            }
            break;
          }
        }
      });
    }

    ['1', '2', '3', '4'].forEach((pieceNumber) => {
      const found = overlaps
        .map((overlap) => {
          return !!overlap.pieceNumbers.find(
            (number) => number === pieceNumber
          );
        })
        .some((foundNumber) => foundNumber);

      if (!found) {
        getRef(pieceNumber as PieceNumber).current!.style.transform =
          'scale(1) translateX(0)';
      }
    });
    // eslint-disable-next-line
  }, [
    firstRef,
    secondRef,
    thirdRef,
    fourthRef,
    positionsPieces,
    score,
    isGameOver,
    width,
  ]);
}
