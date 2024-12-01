import { useSelector } from 'react-redux';
import { selectPieces } from '../app/slices/piecesSlice';
import { useCallback, useMemo } from 'react';
import { Position } from '../types';

export default function usePiecesForPosition() {
  const pieces = useSelector(selectPieces);

  const entries = useMemo(() => {
    return pieces.map((piece) => ({
      pieceNumber: piece.pieceNumber,
      playerNumber: piece.playerNumber,
      position: piece.position,
    }));
  }, [pieces]);

  const findPiecesForPosition = useCallback(
    (position: Position) => {
      const pieces = [];

      for (const entry of entries) {
        if (
          entry.position?.x === position.x &&
          entry.position.y === position.y
        ) {
          pieces.push(entry);
        }
      }

      return pieces;
    },
    [entries]
  );

  return findPiecesForPosition;
}
