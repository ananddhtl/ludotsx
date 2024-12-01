import { PlayerNumber, Position } from '../types';

export default function findNextPosition(
  position: Position,
  score: number,
  playerNumber: PlayerNumber
): Position {
  const { x, y } = position;
  let newX = x;
  let newY = y;
  let scoreCounter = score;

  do {
    while (newY === 14 && newX >= 7 && newX <= 8 && scoreCounter > 0) {
      if (playerNumber === '4' && newX === 7) {
        while (scoreCounter > 0) {
          newY -= 1;
          scoreCounter -= 1;
        }
        break;
      }

      newX -= 1;
      scoreCounter -= 1;
    }

    while (newX === 6 && newY > 8 && scoreCounter > 0) {
      newY -= 1;
      scoreCounter -= 1;
      if (newY === 8) {
        newX = 5;
      }
    }

    while (newY === 8 && newX < 6 && newX > 0 && scoreCounter > 0) {
      newX -= 1;
      scoreCounter -= 1;
    }

    while (newX === 0 && newY > 6 && newY < 9 && scoreCounter > 0) {
      if (playerNumber === '1' && newY === 7) {
        while (scoreCounter > 0) {
          newX += 1;
          scoreCounter -= 1;
        }
        break;
      }
      newY -= 1;
      scoreCounter -= 1;
    }

    while (newY === 6 && newX >= 0 && newX < 6 && scoreCounter > 0) {
      newX += 1;
      scoreCounter -= 1;
      if (newX === 6) {
        newY = 5;
      }
    }

    while (newX === 6 && newY > 0 && newY < 6 && scoreCounter > 0) {
      newY -= 1;
      scoreCounter -= 1;
    }

    while (newY === 0 && newX > 5 && newX < 8 && scoreCounter > 0) {
      if (playerNumber === '2' && newX === 7) {
        while (scoreCounter > 0) {
          newY += 1;
          scoreCounter -= 1;
        }
        break;
      }
      newX += 1;
      scoreCounter -= 1;
    }

    while (newX === 8 && newY >= 0 && newY < 6 && scoreCounter > 0) {
      newY += 1;
      scoreCounter -= 1;

      if (newY === 6) {
        newX = 9;
      }
    }

    while (newY === 6 && newX > 8 && newX < 14 && scoreCounter > 0) {
      newX += 1;
      scoreCounter -= 1;
    }

    while (newX === 14 && newY > 5 && newY < 8 && scoreCounter > 0) {
      if (playerNumber === '3' && newY === 7) {
        while (scoreCounter > 0) {
          newX -= 1;
          scoreCounter -= 1;
        }
        break;
      }

      newY += 1;
      scoreCounter -= 1;
    }

    while (newY === 8 && newX > 8 && newX < 15 && scoreCounter > 0) {
      newX -= 1;
      scoreCounter -= 1;

      if (newX === 8) {
        newY = 9;
      }
    }

    while (newX === 8 && newY > 8 && newY < 14 && scoreCounter > 0) {
      newY += 1;
      scoreCounter -= 1;
    }

    while (newX === 7 && newY < 14 && newY > 8 && scoreCounter > 0) {
      newY -= 1;
      scoreCounter -= 1;
    }

    while (newX === 7 && newY > 0 && newY < 6 && scoreCounter > 0) {
      newY += 1;
      scoreCounter -= 1;
    }

    while (newY === 7 && newX > 0 && newX < 6 && scoreCounter > 0) {
      newX += 1;
      scoreCounter -= 1;
    }

    while (newY === 7 && newX > 8 && newX < 14 && scoreCounter > 0) {
      newX -= 1;
      scoreCounter -= 1;
    }
  } while (scoreCounter > 0);

  return { x: newX, y: newY };
}
