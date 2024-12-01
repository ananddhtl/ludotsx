import { Color, Position, playerNumberToColor } from '../types';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPlayerNumber = (color: Color) => {
  let number;

  for (const [playerNumber, playerColor] of Object.entries(
    playerNumberToColor
  )) {
    if (playerColor === color) {
      number = playerNumber;
    }
  }

  if (!number) return 1;

  return +number;
};

export const pause = async (timeMs: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeMs);
  });
};

export const getCoordinates = (width: number, position: Position) => {
  const block = width / 15;
  const { x, y } = position;
  const bottom = (14 - y) * block;
  const left = x * block;
  return [bottom, left];
};

export const isAlreadyPositioned = (
  div: HTMLDivElement,
  position: Position,
  width: number
) => {
  const currentBottom = div.style.bottom.replace('px', '');
  const currentLeft = div.style.left.replace('px', '');

  const [bottom, left] = getCoordinates(width, position);
  return +currentBottom === bottom && +currentLeft === left;
};

export const isValidPosition = (position: Position) => {
  const { x, y } = position;

  return !(x > 5 && x < 9 && y > 5 && y < 9);
};
