import useIsActivePlayer from '../hooks/useIsActivePlayer';
import useIsPlayer from '../hooks/useIsPlayer';
import useIsPlayingPlayer from '../hooks/useIsPlayingPlayer';
import { PlayerNumber } from '../types';
import PlayerBaseSpawn from './PlayerBaseSpawn';

interface PlayerBaseProps {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
  playerNumber: PlayerNumber;
  color: string;
  animationClass: string;
}

const PlayerBase: React.FC<PlayerBaseProps> = ({
  vertical,
  horizontal,
  playerNumber,
  color,
  animationClass,
}) => {
  const verticalClasses =
    vertical === 'top' ? 'row-span-6' : 'row-start-10 row-span-6';
  const horizontalClasses =
    horizontal === 'left' ? 'col-span-6' : 'col-start-10 col-span-6';
  const colorClass = color;

  let borderClasses;
  let titlePosition;

  if (vertical === 'top' && horizontal === 'left') {
    borderClasses = 'border-r-2 border-b-2';
    titlePosition = 'col-start-2 col-span-4 row-start-1';
  } else if (vertical === 'top' && horizontal === 'right') {
    borderClasses = 'border-l-2 border-b-2';
    titlePosition = 'col-start-2 col-span-4 row-start-1';
  } else if (vertical === 'bottom' && horizontal === 'right') {
    borderClasses = 'border-l-2 border-t-2';
    titlePosition = 'col-start-2 col-span-4 row-start-6';
  } else if (vertical === 'bottom' && horizontal === 'left') {
    borderClasses = 'border-r-2 border-t-2';
    titlePosition = 'col-start-2 col-span-4 row-start-6';
  }

  const isPlayer = useIsPlayer(playerNumber);
  const isPlaying = useIsPlayingPlayer(playerNumber);

  const active = useIsActivePlayer(playerNumber);
  return (
    <div
      className={`${verticalClasses} ${horizontalClasses} ${colorClass} ${borderClasses} border-black grid grid-cols-6 grid-rows-6`}
    >
      <PlayerBaseSpawn playerNumber={playerNumber} color={color} />
      {Array(17)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`${active ? animationClass : ''} ${color}`}
          ></div>
        ))}
      <div
        className={`${titlePosition} flex justify-center items-center ${
          active ? animationClass : ''
        } ${color}`}
      >
        <p
          className="text-3xl font-bold text-white"
          style={{
            textShadow: 'black 0px 0px 4px',
          }}
        >
          {isPlayer ? 'You' : isPlaying ? 'Bot' : ''}
        </p>
      </div>
    </div>
  );
};

export default PlayerBase;
