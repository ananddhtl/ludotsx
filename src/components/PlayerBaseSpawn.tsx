import useBotSelect from '../hooks/useBotSelect';
import useDisplace from '../hooks/useDisplace';
import useIsPlayingPlayer from '../hooks/useIsPlayingPlayer';
import usePieceOverlapping from '../hooks/usePieceOverlapping';
import useSelect from '../hooks/useSelect';
import { PlayerNumber } from '../types';
import Piece from './Piece';

interface PlayerBaseSpawnProps {
  playerNumber: PlayerNumber;
  color: string;
}

const PlayerBaseSpawn: React.FC<PlayerBaseSpawnProps> = ({
  color,
  playerNumber,
}) => {
  const refs = useSelect(playerNumber);
  useBotSelect(playerNumber);
  useDisplace(playerNumber, refs);
  usePieceOverlapping(playerNumber, refs);

  const isPlaying = useIsPlayingPlayer(playerNumber);

  return (
    <div
      className={`row-start-2 row-span-4 col-start-2 col-span-4 bg-white border-2 border-black grid grid-cols-2 grid-rows-2`}
    >
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          {isPlaying && (
            <Piece playerNumber={playerNumber} pieceNumber="1" ref={refs[0]} />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          {isPlaying && (
            <Piece playerNumber={playerNumber} pieceNumber="2" ref={refs[1]} />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          {isPlaying && (
            <Piece playerNumber={playerNumber} pieceNumber="3" ref={refs[2]} />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          {isPlaying && (
            <Piece playerNumber={playerNumber} pieceNumber="4" ref={refs[3]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerBaseSpawn;
