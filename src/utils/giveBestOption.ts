import { getRandomNumber } from '.';
import { STARTING_POSITIONS, STARTING_POSITIONS_PLAYER } from '../constants';
import { Piece, PieceNumber, PlayerNumber, Position } from '../types';

const findPositionToStart = (
  possibleOptions: { position: Position; pieceNumber: PieceNumber }[],
  playerNumber: PlayerNumber
) => {
  let index: number | null = null;
  possibleOptions.find((option, idx) => {
    const starting = STARTING_POSITIONS.find(
      (position) =>
        position.x === option.position.x && position.y === option.position.y
    );
    if (
      starting &&
      STARTING_POSITIONS_PLAYER[playerNumber].x === starting.x &&
      STARTING_POSITIONS_PLAYER[playerNumber].y === starting.y
    ) {
      index = idx;
      return true;
    }
    return false;
  });
  return index;
};

const findPiecesForPosition = (allPieces: Piece[], position: Position) => {
  const pieces = [];

  for (const piece of allPieces) {
    if (piece.position?.x === position.x && piece.position.y === position.y) {
      pieces.push(piece);
    }
  }

  return pieces;
};

export default function giveBestOption(
  allPieces: Piece[],
  possibleOptions: { position: Position; pieceNumber: PieceNumber }[],
  playerNumber: PlayerNumber,
  difficulty: 'normal' | 'difficult'
): number {
  switch (difficulty) {
    case 'normal': {
      const index: number | null = findPositionToStart(
        possibleOptions,
        playerNumber
      );

      return index !== null
        ? index
        : getRandomNumber(0, possibleOptions.length - 1);
    }
    case 'difficult': {
      console.log('here');
      const beatMap = Array(possibleOptions.length).fill(false);
      possibleOptions.forEach((option, index) => {
        const piecesForPosition = findPiecesForPosition(
          allPieces,
          option.position
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

        for (const [player, count] of Object.entries(playersPiecesCount)) {
          if (player !== playerNumber && count === 1) {
            beatMap[index] = true;
          }
        }
      });

      const beatPositionIdx = beatMap.findIndex((item) => item);
      console.log('beat position', possibleOptions[beatPositionIdx]);

      if (beatPositionIdx !== -1) {
        return beatPositionIdx;
      }

      const index: number | null = findPositionToStart(
        possibleOptions,
        playerNumber
      );

      return index !== null
        ? index
        : getRandomNumber(0, possibleOptions.length - 1);
    }
  }
  return 0;
}
