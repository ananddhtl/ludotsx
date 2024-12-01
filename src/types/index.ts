export interface Player {
  isPlaying: boolean;
  isBot: boolean;
  isRolling: boolean;
  isActive: boolean;
  isSelecting: boolean;
  score: number | null;
  moveAgain: boolean;
  beat: boolean;
}

export interface Piece {
  playerNumber: PlayerNumber;
  pieceNumber: PieceNumber;
  position: Position | null;
  previousPosition: Position | null;
  possiblePosition: Position | null;
  isMoving: boolean;
  outOfPlay: boolean;
}

export interface Position {
  y: number;
  x: number;
}

export type PlayerNumber = '1' | '2' | '3' | '4';
export type PieceNumber = PlayerNumber;
export type Color = 'red' | 'green' | 'yellow' | 'blue';
export type Difficulty = 'easy' | 'normal' | 'difficult';

export type NumberOfPlayers = 2 | 4;

export const playerNumberToColor: Record<PlayerNumber, Color> = {
  '1': 'green',
  '2': 'yellow',
  '3': 'blue',
  '4': 'red',
};

export enum Screen {
  STARTING,
  GAME,
  GAME_OVER,
}


