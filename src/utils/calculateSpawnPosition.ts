import { PieceNumber, PlayerNumber } from '../types';

export default function calculateSpawnPosition(
  playerNumber: PlayerNumber,
  pieceNumber: PieceNumber,
  width: number
) {
  let leftAdjustment: number;
  let topAdjustment: number;

  switch (playerNumber) {
    case '1': {
      leftAdjustment = 0;
      topAdjustment = (width / 15) * 9;
      break;
    }
    case '2': {
      leftAdjustment = (width / 15) * 9;
      topAdjustment = (width / 15) * 9;
      break;
    }
    case '3': {
      leftAdjustment = (width / 15) * 9 - 0.75;
      topAdjustment = -2.25;
      break;
    }
    case '4': {
      leftAdjustment = -0.75;
      topAdjustment = -2.25;
      break;
    }
  }

  switch (pieceNumber) {
    case '1': {
      topAdjustment += (width / 15) * 2;
      break;
    }
    case '2': {
      topAdjustment += (width / 15) * 2;
      leftAdjustment += (width / 15) * 2 - 3.75;
      break;
    }
    case '3': {
      leftAdjustment += (width / 15) * 2 - 3.75;
      topAdjustment += 3;
      break;
    }
    case '4': {
      topAdjustment += 3;
      break;
    }
  }

  const bottom = topAdjustment + (width / 15) * 1.6;
  const left = leftAdjustment + (width / 15) * 1.6;

  return { bottom, left };
}
