import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setScreen } from '../app/slices/screensSlice';
import { PlayerNumber, Screen } from '../types';
import { selectGameSettings } from '../app/slices/gameSettingsSlice';
import {
  setIsActive,
  setIsNotBot,
  setIsPlayingPlayer,
} from '../app/slices/playersSlice';
import { getPlayerNumber, getRandomNumber } from '../utils';
import { addPiecesForPlayer } from '../app/slices/piecesSlice';

export default function useStartGame() {
  const dispatch = useDispatch<AppDispatch>();

  const { playerColor, numberOfPlayers } = useSelector(selectGameSettings);
  const playerNumber = getPlayerNumber(playerColor!);

  let randomPlayerNumber: number;
  do {
    randomPlayerNumber = getRandomNumber(1, 4);
  } while (randomPlayerNumber === playerNumber);

  const leftPlayerNumbers = Array(4)
    .fill(0)
    .map((_, i) => i + 1)
    .filter(
      (number) => number !== playerNumber && number !== randomPlayerNumber
    )
    .map((n) => n.toString());

  const startGame = () => {
    dispatch(setScreen(Screen.GAME));

    switch (numberOfPlayers) {
      case 2: {
        dispatch(
          setIsPlayingPlayer([
            { active: true, number: playerNumber.toString() as PlayerNumber },
            {
              active: true,
              number: randomPlayerNumber.toString() as PlayerNumber,
            },
          ])
        );

        dispatch(addPiecesForPlayer(playerNumber.toString() as PlayerNumber));
        dispatch(
          addPiecesForPlayer(randomPlayerNumber.toString() as PlayerNumber)
        );

        dispatch(
          setIsPlayingPlayer(
            leftPlayerNumbers.map((n) => {
              return { active: false, number: n as PlayerNumber };
            })
          )
        );
        break;
      }

      case 4: {
        dispatch(
          setIsPlayingPlayer([
            { active: true, number: '1' },
            { active: true, number: '2' },
            { active: true, number: '3' },
            { active: true, number: '4' },
          ])
        );
        dispatch(addPiecesForPlayer('1'));
        dispatch(addPiecesForPlayer('2'));
        dispatch(addPiecesForPlayer('3'));
        dispatch(addPiecesForPlayer('4'));
        break;
      }
    }

    dispatch(setIsNotBot(playerNumber.toString() as PlayerNumber));
    dispatch(setIsActive([playerNumber.toString() as PlayerNumber, true]));
  };

  return startGame;
}
