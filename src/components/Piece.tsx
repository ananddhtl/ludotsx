import { PieceNumber, PlayerNumber, playerNumberToColor } from '../types';
import greenPiece from '../assets/green-piece.png';
import yellowPiece from '../assets/yellow-piece.png';
import bluePiece from '../assets/blue-piece.png';
import redPiece from '../assets/red-piece.png';
import { useSelector } from 'react-redux';
import { selectWidth } from '../app/slices/boardSlice';
import { ForwardedRef, forwardRef } from 'react';
import useIsActivePlayer from '../hooks/useIsActivePlayer';
import useIsSelecting from '../hooks/useIsSelecting';
import usePiecesForPlayer from '../hooks/usePiecesForPlayer';
import { PIECE_MOVE_TIME } from '../constants';
import calculateSpawnPosition from '../utils/calculateSpawnPosition';
import useIsPlayer from '../hooks/useIsPlayer';

interface PieceProps {
  playerNumber: PlayerNumber;
  pieceNumber: PieceNumber;
}

const playerToPiece = {
  '1': greenPiece,
  '2': yellowPiece,
  '3': bluePiece,
  '4': redPiece,
};

const Piece = forwardRef<HTMLDivElement, PieceProps>(function (
  { playerNumber, pieceNumber },
  ref: ForwardedRef<HTMLDivElement | null>
) {
  const width = useSelector(selectWidth) ?? 0;

  const isActive = useIsActivePlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);

  const isPossibleToMove = usePiecesForPlayer(playerNumber).find(
    (piece) => piece.pieceNumber === pieceNumber
  )?.possiblePosition;

  const { bottom, left } = calculateSpawnPosition(
    playerNumber,
    pieceNumber,
    width
  );
  return (
    <div
      className={`absolute ${
        isActive && isSelecting && isPossibleToMove !== null && isPlayer
          ? 'active-piece'
          : ''
      } w-[50px] h-[50px] transition-all ${isPlayer ? 'z-10' : ''}`}
      style={{
        bottom: bottom,
        left: left,
        animationDuration: `${PIECE_MOVE_TIME}ms`,
      }}
      ref={ref}
    >
      <img
        src={playerToPiece[playerNumber]}
        alt={`${playerNumberToColor[playerNumber]} piece`}
      />
    </div>
  );
});

export default Piece;
