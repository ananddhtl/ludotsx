import { PlayerNumber } from '../types';
import useIsPlayingPlayer from '../hooks/useIsPlayingPlayer';
import useIsPlayer from '../hooks/useIsPlayer';
import useIsRolling from '../hooks/useIsRolling';
import Card from './Card';
import useIsActivePlayer from '../hooks/useIsActivePlayer';
import useRollDice from '../hooks/useRollDice';
import { useEffect } from 'react';
import useIsSelecting from '../hooks/useIsSelecting';

import arrow from '../assets/arrow.png';
import useRollOneMoreTime from '../hooks/useRollOneMoreTime';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectSelectedPiece,
  setRollOneMoreTime,
} from '../app/slices/piecesSlice';
import useMoveAgain from '../hooks/useMoveAgain';

interface PlayerPanelProps {
  playerNumber: PlayerNumber;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerNumber }) => {
  const { score, rollDice } = useRollDice(playerNumber);

  const isPlaying = useIsPlayingPlayer(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);
  const isRolling = useIsRolling(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);

  const rollOneMoreTime = useRollOneMoreTime();
  const dispatch = useDispatch<AppDispatch>();
  const selectedPiece = useSelector(selectSelectedPiece);
  const moveAgain = useMoveAgain(playerNumber);

  const disabled = isRolling || !isActive || isSelecting;

  let arrowClasses;

  switch (playerNumber) {
    case '1': {
      arrowClasses = '';
      break;
    }
    case '2': {
      arrowClasses = '-right-36 arrow-right';
      break;
    }
    case '3': {
      arrowClasses = '-right-36 arrow-right';
      break;
    }
    case '4': {
      arrowClasses = '';
      break;
    }
  }

  useEffect(() => {
    (async () => {
      if (
        isActive &&
        !isPlayer &&
        !isRolling &&
        !isSelecting &&
        !rollOneMoreTime &&
        !moveAgain
      ) {
        await rollDice();
      }
    })();
  }, [
    isActive,
    isPlayer,
    isRolling,
    isSelecting,
    rollDice,
    rollOneMoreTime,
    selectedPiece,
    moveAgain,
  ]);

  useEffect(() => {
    (async () => {
      if (rollOneMoreTime && isActive && !isSelecting && !isRolling) {
        dispatch(setRollOneMoreTime(false));
        await rollDice();
      }
    })();
  }, [rollOneMoreTime, rollDice, dispatch, isActive, isSelecting, isRolling]);

  return isPlaying ? (
    <div
      className={`flex gap-3 ${
        +playerNumber === 1 || +playerNumber === 4
          ? 'flex-row'
          : 'flex-row-reverse'
      } relative`}
    >
      <div className="flex p-4 bg-white gap-3 rounded-md shadow-md items-center">
        <p>Score: {score}</p>
        {isPlayer && (
          <button
            onClick={async () => {
              rollDice();
            }}
            className={`px-2 py-1  text-white rounded-sm transition-all duration-200 ${
              disabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
            }`}
            disabled={disabled}
          >
            Roll Dice
          </button>
        )}
      </div>
      {isPlayer && !disabled && (
        <div
          className={`absolute w-24 h-24 ${arrowClasses} -top-4 right-52  arrow-left`}
        >
          <img src={arrow} alt="arrow"></img>
        </div>
      )}
      {isRolling && (
        <Card additionalClassnames="p-1 px-3 flex items-center">
          <p>Rolling...</p>
        </Card>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default PlayerPanel;
