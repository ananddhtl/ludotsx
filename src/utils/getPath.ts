import { PlayerNumber, Position } from '../types';

export default function getPath(
  startPosition: Position,
  endPosition: Position,
  playerNumber: PlayerNumber
) {
  let { x, y } = startPosition;
  const { x: newX, y: newY } = endPosition;

  const positions: Position[] = [];

  do {
    while (y === 14 && x >= 7 && x <= 8 && (x !== newX || y !== newY)) {
      if (playerNumber === '4' && x === 7) {
        while (x !== newX || y !== newY) {
          y -= 1;
          positions.push({ x, y });
        }
        break;
      }
      x -= 1;
      positions.push({ x, y });
    }

    while (x === 6 && y > 8 && (x !== newX || y !== newY)) {
      y -= 1;
      if (y === 8) {
        x = 5;
      }
      positions.push({ x, y });
    }

    while (y === 8 && x < 6 && x > 0 && (x !== newX || y !== newY)) {
      x -= 1;
      positions.push({ x, y });
    }

    while (x === 0 && y > 6 && y < 9 && (x !== newX || y !== newY)) {
      if (playerNumber === '1' && y === 7) {
        while (x !== newX || y !== newY) {
          x += 1;
          positions.push({ x, y });
        }
        break;
      }
      y -= 1;
      positions.push({ x, y });
    }

    while (y === 6 && x >= 0 && x < 6 && (x !== newX || y !== newY)) {
      x += 1;
      if (x === 6) {
        y = 5;
      }
      positions.push({ x, y });
    }

    while (x === 6 && y > 0 && y < 6 && (x !== newX || y !== newY)) {
      y -= 1;
      positions.push({ x, y });
    }

    while (y === 0 && x > 5 && x < 8 && (x !== newX || y !== newY)) {
      if (playerNumber === '2' && x === 7) {
        while (x !== newX || y !== newY) {
          y += 1;
          positions.push({ x, y });
        }
        break;
      }
      x += 1;
      positions.push({ x, y });
    }

    while (x === 8 && y >= 0 && y < 6 && (x !== newX || y !== newY)) {
      y += 1;

      if (y === 6) {
        x = 9;
      }
      positions.push({ x, y });
    }

    while (y === 6 && x > 8 && x < 14 && (x !== newX || y !== newY)) {
      x += 1;
      positions.push({ x, y });
    }

    while (x === 14 && y > 5 && y < 8 && (x !== newX || y !== newY)) {
      if (playerNumber === '3' && y === 7) {
        while (x !== newX || y !== newY) {
          x -= 1;
          positions.push({ x, y });
        }
        break;
      }

      y += 1;
      positions.push({ x, y });
    }

    while (y === 8 && x > 8 && x < 15 && (x !== newX || y !== newY)) {
      x -= 1;

      if (x === 8) {
        y = 9;
      }
      positions.push({ x, y });
    }

    while (x === 8 && y > 8 && y < 14 && (x !== newX || y !== newY)) {
      y += 1;
      positions.push({ x, y });
    }

    while (x === 7 && y < 14 && y > 8 && (x !== newX || y !== newY)) {
      y -= 1;
      positions.push({ x, y });
    }

    while (x === 7 && y > 0 && y < 6 && (x !== newX || y !== newY)) {
      y += 1;
      positions.push({ x, y });
    }

    while (y === 7 && x > 0 && x < 6 && (x !== newX || y !== newY)) {
      x += 1;
      positions.push({ x, y });
    }

    while (y === 7 && x > 8 && x < 14 && (x !== newX || y !== newY)) {
      x -= 1;
      positions.push({ x, y });
    }
  } while (x !== newX || y !== newY);
  return positions;
}
